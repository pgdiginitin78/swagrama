import re

with open(r"d:\Nitin\projects\swagrama-react\src\components\pages\healingServices\ipdHospital\StayBookingModal.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. State declarations
content = content.replace(
    "  const [familyMembers, setFamilyMembers] = useState([]);\n  const familyMemberLimit = 3;",
    "  const [familyMembers, setFamilyMembers] = useState([]);\n  const familyMemberLimit = 3;\n  const isOutdoorLeaving = selectedService?.roomTypeId === 6;\n  const [outdoorMembers, setOutdoorMembers] = useState([]);\n  const outdoorMemberLimit = roomStatus?.availableOccupancy ?? 0;"
)

# 2. Handlers
handlers = """  const handleRemoveFamilyMember = (index) => {
    setFamilyMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddOutdoorMember = () => {
    if (outdoorMembers.length >= outdoorMemberLimit) return;
    setOutdoorMembers((prev) => [
      ...prev,
      { firstName: "", lastName: "", age: "", gender: "Male" },
    ]);
  };

  const handleRemoveOutdoorMember = (index) => {
    setOutdoorMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOutdoorMemberChange = (index, field, value) => {
    setOutdoorMembers((prev) =>
      prev.map((member, i) =>
        i === index ? { ...member, [field]: value } : member,
      ),
    );
  };"""

content = content.replace(
    "  const handleRemoveFamilyMember = (index) => {\n    setFamilyMembers((prev) => prev.filter((_, i) => i !== index));\n  };",
    handlers
)

# 3. Validation
validation_orig = """    if (!formValues?.twinSharing && formValues?.sharingType === "Family") {
      if (familyMembers.length === 0) {
        errorAlert("Please add at least one family member!");
        return;
      }
      const hasIncompleteMember = familyMembers.some(
        (member) =>
          !member.firstName ||
          !member.lastName ||
          member.age === "" ||
          member.age === null ||
          member.age === undefined ||
          !member.gender,
      );
      if (hasIncompleteMember) {
        errorAlert(
          "Please fill first name, last name, age and gender for all family members!",
        );
        return;
      }
    }"""

validation_new = """    if (isOutdoorLeaving) {
      if (outdoorMembers.length > 0) {
        const hasIncompleteMember = outdoorMembers.some(
          (member) =>
            !member.firstName ||
            !member.lastName ||
            member.age === "" ||
            member.age === null ||
            member.age === undefined ||
            !member.gender,
        );
        if (hasIncompleteMember) {
          errorAlert(
            "Please fill first name, last name, age and gender for all members!",
          );
          return;
        }
      }
    } else {
      if (!formValues?.twinSharing && formValues?.sharingType === "Family") {
        if (familyMembers.length === 0) {
          errorAlert("Please add at least one family member!");
          return;
        }
        const hasIncompleteMember = familyMembers.some(
          (member) =>
            !member.firstName ||
            !member.lastName ||
            member.age === "" ||
            member.age === null ||
            member.age === undefined ||
            !member.gender,
        );
        if (hasIncompleteMember) {
          errorAlert(
            "Please fill first name, last name, age and gender for all family members!",
          );
          return;
        }
      }
    }"""
content = content.replace(validation_orig, validation_new)

# 4. avail check
avail_orig = """      if (avail !== null) {
        if (avail <= 0) {
          errorAlert("This room is fully occupied. No beds available.");
          return;
        }
        if (avail === 1) {"""

avail_new = """      if (avail !== null) {
        if (avail <= 0) {
          errorAlert("This room is fully occupied. No beds available.");
          return;
        }
        if (!isOutdoorLeaving) {
          if (avail === 1) {"""
content = content.replace(avail_orig, avail_new)

avail_close_orig = """          if (requestedChildren > 2) {
            errorAlert("Maximum 2 children allowed per booking.");
            return;
          }
        }
      }"""

avail_close_new = """          if (requestedChildren > 2) {
            errorAlert("Maximum 2 children allowed per booking.");
            return;
          }
        }
        }
      }"""
content = content.replace(avail_close_orig, avail_close_new)

# 5. saveObj
save_orig = """      familyMembers:
        !formValues?.twinSharing && formValues?.sharingType === "Family"
          ? familyMembers
          : [],"""

save_new = """      familyMembers: isOutdoorLeaving
        ? outdoorMembers
        : !formValues?.twinSharing && formValues?.sharingType === "Family"
        ? familyMembers
        : [],"""
content = content.replace(save_orig, save_new)

# 6. Preferences JSX twinSharing
pref_orig = """                  {
                    label: "Twin Sharing?",
                    sub: "Share with another guest",
                    subColor: "text-booking-primary",
                    field: "twinSharing",
                  },"""

pref_new = """                  {
                    label: "Twin Sharing?",
                    sub: "Share with another guest",
                    subColor: "text-booking-primary",
                    field: "twinSharing",
                    show: !isOutdoorLeaving,
                  },"""
content = content.replace(pref_orig, pref_new)
content = content.replace("].map(({ label, sub, subColor, field }) => (", "].filter((item) => item.show !== false).map(({ label, sub, subColor, field }) => (")

# 7. Sharing Preference JSX and Outdoor JSX
share_pref_orig = """            {!formValues?.twinSharing && ("""
share_pref_new = """            {!formValues?.twinSharing && !isOutdoorLeaving && ("""
content = content.replace(share_pref_orig, share_pref_new)

outdoor_jsx = """
            {isOutdoorLeaving && (
              <div className="flex flex-col gap-2 pt-2 border rounded-[9px] p-2 mt-2">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-booking-primary uppercase tracking-widest">
                    Members ({outdoorMembers.length}/{outdoorMemberLimit})
                  </p>
                  <button
                    type="button"
                    disabled={outdoorMembers.length >= outdoorMemberLimit}
                    onClick={handleAddOutdoorMember}
                    className="px-3 py-1.5 bg-booking-primary text-white text-[10px] font-bold rounded-lg hover:bg-booking-primaryDark transition-all disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-widest"
                  >
                    + Add Member
                  </button>
                </div>

                {outdoorMembers.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-[11px]">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 px-2 py-1.5 text-left font-bold text-booking-primary uppercase tracking-wider text-[9px]">
                            First Name
                          </th>
                          <th className="border border-gray-200 px-2 py-1.5 text-left font-bold text-booking-primary uppercase tracking-wider text-[9px]">
                            Last Name
                          </th>
                          <th className="border border-gray-200 px-2 py-1.5 text-left font-bold text-booking-primary uppercase tracking-wider text-[9px]">
                            Age
                          </th>
                          <th className="border border-gray-200 px-2 py-1.5 text-left font-bold text-booking-primary uppercase tracking-wider text-[9px]">
                            Gender
                          </th>
                          <th className="border border-gray-200 px-2 py-1.5 text-center font-bold text-booking-primary uppercase tracking-wider text-[9px]">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {outdoorMembers.map((member, index) => (
                          <tr key={index}>
                            <td className="border border-gray-200 px-1.5 py-1">
                              <input
                                type="text"
                                value={member.firstName}
                                onChange={(e) =>
                                  handleOutdoorMemberChange(
                                    index,
                                    "firstName",
                                    e.target.value,
                                  )
                                }
                                placeholder="First Name"
                                className="w-full px-1.5 py-1 border border-gray-200 rounded text-[11px] focus:outline-none focus:border-booking-primary"
                              />
                            </td>
                            <td className="border border-gray-200 px-1.5 py-1">
                              <input
                                type="text"
                                value={member.lastName}
                                onChange={(e) =>
                                  handleOutdoorMemberChange(
                                    index,
                                    "lastName",
                                    e.target.value,
                                  )
                                }
                                placeholder="Last Name"
                                className="w-full px-1.5 py-1 border border-gray-200 rounded text-[11px] focus:outline-none focus:border-booking-primary"
                              />
                            </td>
                            <td className="border border-gray-200 px-1.5 py-1">
                              <input
                                type="number"
                                min={0}
                                max={120}
                                value={member.age}
                                onChange={(e) =>
                                  handleOutdoorMemberChange(
                                    index,
                                    "age",
                                    e.target.value,
                                  )
                                }
                                placeholder="Age"
                                className="w-full px-1.5 py-1 border border-gray-200 rounded text-[11px] focus:outline-none focus:border-booking-primary"
                              />
                            </td>
                            <td className="border border-gray-200 px-1.5 py-1">
                              <select
                                value={member.gender}
                                onChange={(e) =>
                                  handleOutdoorMemberChange(
                                    index,
                                    "gender",
                                    e.target.value,
                                  )
                                }
                                className="w-full px-1.5 py-1 border border-gray-200 rounded text-[11px] focus:outline-none focus:border-booking-primary bg-white"
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </td>
                            <td className="border border-gray-200 px-1.5 py-1 text-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveOutdoorMember(index)}
                                className="w-5 h-5 rounded-full border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all inline-flex items-center justify-center active:scale-95"
                              >
                                <Remove sx={{ fontSize: 14 }} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}"""

reservation_summary_orig = """            <div className="w-full mt-2">
              <motion.div"""
content = content.replace(reservation_summary_orig, outdoor_jsx + "\n" + reservation_summary_orig)

# 8. Guest Info fields
adults_orig = """                    <div className="">
                      <InputField
                        control={control}
                        name="noOfAdults"
                        label="Adults (Max 3)"
                        variant="outlined"
                        type="number"
                        inputProps={{ min: 1, max: 3 }}
                        disabled={!formValues?.twinSharing}
                      />
                    </div>"""

adults_new = """                    {!isOutdoorLeaving && (
                      <div className="">
                        <InputField
                          control={control}
                          name="noOfAdults"
                          label="Adults (Max 3)"
                          variant="outlined"
                          type="number"
                          inputProps={{ min: 1, max: 3 }}
                          disabled={!formValues?.twinSharing}
                        />
                      </div>
                    )}"""
content = content.replace(adults_orig, adults_new)

child_0to5_orig = """                    <div className="flex items-center justify-between p-2 border rounded-[9px] bg-white hover:border-booking-primary transition-colors">
                      <div className="flex flex-col">
                        <p className="text-[11px] font-bold text-booking-primary uppercase tracking-wider">
                          Children (0-5 Years)"""
child_0to5_new = """                    {!isOutdoorLeaving && (
                    <div className="flex items-center justify-between p-2 border rounded-[9px] bg-white hover:border-booking-primary transition-colors">
                      <div className="flex flex-col">
                        <p className="text-[11px] font-bold text-booking-primary uppercase tracking-wider">
                          Children (0-5 Years)"""
content = content.replace(child_0to5_orig, child_0to5_new)

content = re.sub(
    r'(<Add sx=\{\{ fontSize: 12 \}\} />\s*</button>\s*</div>\s*</div>)',
    r'\1\n                    )}',
    content
)

child_6to12_orig = """                    <div className="flex items-center justify-between p-2 border rounded-[9px] bg-white hover:border-booking-primary transition-colors">
                      <div className="flex flex-col">
                        <p className="text-[11px] font-bold text-booking-primary uppercase tracking-wider">
                          Children (6-12 Years)"""
child_6to12_new = """                    {!isOutdoorLeaving && (
                    <div className="flex items-center justify-between p-2 border rounded-[9px] bg-white hover:border-booking-primary transition-colors">
                      <div className="flex flex-col">
                        <p className="text-[11px] font-bold text-booking-primary uppercase tracking-wider">
                          Children (6-12 Years)"""
content = content.replace(child_6to12_orig, child_6to12_new)

with open(r"d:\Nitin\projects\swagrama-react\src\components\pages\healingServices\ipdHospital\StayBookingModal.jsx", "w", encoding="utf-8") as f:
    f.write(content)
