export const NO_ROOM_MESSAGE =
  "No available room matches the selected patient's gender for this time slot. Please choose another time.";

export const toMinutes = (t) => {
  if (t === null || t === undefined) return NaN;
  const m = String(t)
    .trim()
    .match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?$/i);
  if (!m) return NaN;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const p = m[3] ? m[3].toUpperCase() : null;
  if (p === "PM" && h < 12) h += 12;
  if (p === "AM" && h === 12) h = 0;
  return h * 60 + min;
};

export const sameTime = (a, b) => {
  const x = toMinutes(a);
  const y = toMinutes(b);
  if (Number.isNaN(x) || Number.isNaN(y)) return a === b;
  return x === y;
};

const compareTime = (a, b) => {
  const x = toMinutes(a);
  const y = toMinutes(b);
  if (Number.isNaN(x) || Number.isNaN(y)) {
    return String(a || "").localeCompare(String(b || ""));
  }
  return x - y;
};

export const isSlotInPast = (slot, date) => {
  if (!slot?.startTime || !date) return false;
  const now = new Date();
  const d = new Date(date);
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  if (!sameDay) return false;
  const mins = toMinutes(slot.startTime);
  if (Number.isNaN(mins)) return false;
  return mins < now.getHours() * 60 + now.getMinutes();
};

export const normalizeGender = (person) => {
  if (!person) return "";
  let rawGender = "";
  let name = "";
  if (typeof person === "string") {
    rawGender = person;
  } else if (typeof person === "object") {
    if (person.genderLocked) {
      const lg = String(person.gender || "")
        .toLowerCase()
        .trim();
      if (lg.startsWith("f")) return "Female";
      if (lg.startsWith("m")) return "Male";
    }
    rawGender = person.gender || "";
    name = String(
      person.label ||
        person.name ||
        `${person.firstName || ""} ${person.lastName || ""}` ||
        "",
    ).trim();
  }

  if (/^(mr|shri|master)\b/i.test(name)) return "Male";
  if (/^(mrs|ms|miss|smt)\b/i.test(name)) return "Female";

  const g = String(rawGender).toLowerCase().trim();
  if (g.startsWith("m") && !g.includes("fe")) return "Male";
  if (g.startsWith("f") || g.includes("female")) return "Female";

  return "";
};

export const getSlotGenderRestriction = (slot) => {
  const msg = String(slot?.genderMessage || "")
    .toLowerCase()
    .trim();
  if (!msg) return "unknown";
  if (/\b(both|all|any)\b/.test(msg)) return "all";
  if (/\b(female|females|women|woman|ladies)\b/.test(msg)) return "female";
  if (/\b(male|males|men|man|gents)\b/.test(msg)) return "male";
  return "unknown";
};

export const isSlotAllowedForGender = (slot, patientOrGender) => {
  if (!slot) return false;
  if (patientOrGender === null || patientOrGender === undefined) return true;

  const restriction = getSlotGenderRestriction(slot);
  if (restriction === "all") return true;
  if (restriction === "unknown") return false;

  const patientGender = normalizeGender(patientOrGender).toLowerCase();
  if (!patientGender) return false;
  return restriction === patientGender;
};

export const isSlotAvailable = (slot) => {
  if (!slot) return false;
  if (slot.status && String(slot.status).toLowerCase() !== "available")
    return false;
  const maxBookings =
    typeof slot.maxBookings === "number" ? slot.maxBookings : 1;
  const currentBookingCount =
    typeof slot.bookingCount === "number" ? slot.bookingCount : 0;
  if (currentBookingCount >= maxBookings) return false;
  return true;
};

export const isTherapySlotSelectable = (slot, guest) => {
  if (!slot) return false;
  if (!isSlotAvailable(slot)) return false;
  return isSlotAllowedForGender(slot, guest);
};

const designationRank = (slots, patientGender) =>
  patientGender &&
  slots.some((s) => getSlotGenderRestriction(s) === patientGender)
    ? 0
    : 1;

export const rankRoomsForGuest = (roomSlots, guest) => {
  const g = normalizeGender(guest).toLowerCase();
  return (roomSlots || [])
    .map((slot, order) => ({ slot, order }))
    .filter(({ slot }) => isTherapySlotSelectable(slot, guest))
    .sort(
      (a, b) =>
        designationRank([a.slot], g) - designationRank([b.slot], g) ||
        a.order - b.order,
    )
    .map(({ slot }) => slot);
};

export const findBestRoomBlock = (
  rawSlots,
  startTime,
  requiredCount,
  guest,
  isBlocked,
) => {
  const g = normalizeGender(guest).toLowerCase();
  const count = Math.max(1, requiredCount || 1);

  const roomsMap = new Map();
  (rawSlots || []).forEach((s) => {
    const key = s.serviceRoomID ?? "default";
    if (!roomsMap.has(key)) roomsMap.set(key, []);
    roomsMap.get(key).push(s);
  });

  const candidates = [];
  let order = 0;
  roomsMap.forEach((slots) => {
    const thisOrder = order++;
    const sorted = [...slots].sort((a, b) =>
      compareTime(a.startTime, b.startTime),
    );
    const startIdx = sorted.findIndex((s) => sameTime(s.startTime, startTime));
    if (startIdx < 0 || startIdx + count > sorted.length) return;

    const group = sorted.slice(startIdx, startIdx + count);

    for (let k = 0; k < group.length - 1; k++) {
      if (
        group[k].endTime &&
        group[k + 1].startTime &&
        !sameTime(group[k].endTime, group[k + 1].startTime)
      ) {
        return;
      }
    }

    const ok = group.every(
      (s) => isTherapySlotSelectable(s, guest) && !(isBlocked && isBlocked(s)),
    );
    if (!ok) return;

    candidates.push({
      slots: group,
      rank: designationRank(group, g),
      order: thisOrder,
    });
  });

  candidates.sort((a, b) => a.rank - b.rank || a.order - b.order);
  return candidates.length ? candidates[0].slots : null;
};

export const reassignSessionRooms = ({
  sessions,
  rawSlots,
  guest,
  dateKey,
  takenKeys,
}) => {
  const cleared = [];
  const keyOf = (s) => `${dateKey}|${s.serviceRoomID}|${s.startTime}`;

  const next = (sessions || []).map((group, sIdx) => {
    if (!group || !group.length) return null;
    const startTime = group[0].startTime;
    const count = group.length;

    let block = null;
    if (Array.isArray(rawSlots)) {
      block = findBestRoomBlock(rawSlots, startTime, count, guest, (s) =>
        takenKeys.has(keyOf(s)),
      );
    } else if (group.every((s) => isTherapySlotSelectable(s, guest))) {
      block = group;
    }

    if (!block) {
      cleared.push(sIdx);
      return null;
    }
    block.forEach((s) => takenKeys.add(keyOf(s)));
    return block;
  });

  return { sessions: next, cleared };
};
