import { motion, useInView } from "framer-motion";
import {
  CheckCircle,
  ImageIcon,
  Leaf,
  Mail,
  Phone,
  User,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
  },
};

/* ─── shared input class ─── */
const inputCls =
  "w-full bg-white border border-stone-200 rounded-[7px] px-4 py-3 text-sm text-stone-800 placeholder-stone-400 " +
  "focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 " +
  "transition-all duration-200 hover:border-stone-300";

/* ─── field wrapper ─── */
function Field({ label, icon: Icon, error, children, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      className="flex flex-col gap-1.5"
    >
      <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-stone-500">
        {Icon && <Icon className="w-3.5 h-3.5 text-green-600" />}
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-[11px] flex items-center gap-1" role="alert">
          <X className="w-3 h-3" />
          {error}
        </p>
      )}
    </motion.div>
  );
}

/* ─── main component ─── */
const Registration = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    paymentFile: null,
  });
  const [errors, setErrors] = useState({});
  const [dragOver, setDragOver] = useState(false);

  const ref = useRef(null);
  const formRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  /* ─── validation ─── */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit number";
    // NOTE: paymentFile is intentionally NOT validated here.
    // Google Forms file uploads require Google Drive OAuth and cannot
    // be submitted via a plain HTML POST — removing it prevents the
    // "This field is required" error on the Google Forms response page.
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: "" }));
  };

  const handleFileChange = (file) => {
    if (!file) return;
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      setErrors((er) => ({
        ...er,
        paymentFile: "Only image files accepted (JPG, PNG, WEBP)",
      }));
      return;
    }
    setForm((f) => ({ ...f, paymentFile: file }));
    setErrors((er) => ({ ...er, paymentFile: "" }));
  };

  /* onSubmit: validate → if errors, block; else let browser POST natively */
  const handleSubmit = (e) => {
    const e2 = validate();
    if (Object.keys(e2).length) {
      e.preventDefault();
      setErrors(e2);
    }
  };

  /* Submit button (role=button div) manually triggers form.submit() */
  const handleSubmitClick = () => {
    const e2 = validate();
    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }
    formRef.current?.submit();
  };

  /* ─── form ─── */
  return (
    <div
      className="min-h-screen bg-[#faf9f6]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ── hero banner ── */}
      <section className="relative h-52 sm:h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-stone-800" />
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-green-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.22em" }}
            transition={{ duration: 1 }}
            className="text-amber-300/80 text-[10px] sm:text-xs uppercase tracking-[0.22em] mb-3 font-medium"
          >
            Join the Movement
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl sm:text-6xl font-bold text-white leading-none"
          >
            Registration
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="h-px w-20 bg-amber-400 mx-auto mt-3"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white/60 text-xs mt-3"
          >
            स्वग्राम Community — Secure your place today
          </motion.p>
        </div>
      </section>

      {/* ── form card ── */}
      <section className="py-10 px-4 max-w-xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.1 },
            },
          }}
          className="bg-white rounded-2xl border border-stone-100 shadow-xl overflow-hidden"
        >
          {/* card header */}
          <div className="bg-green-700 px-6 py-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-4 h-4 text-white" />
            </span>
            <div>
              <p className="text-white font-bold text-sm tracking-wide">
                Participant Registration
              </p>
              <p className="text-white/70 text-[11px] mt-0.5">
                Fill in your details &amp; confirm payment
              </p>
            </div>
          </div>

          {/* ══ Google Form — id="mG61Hd" ══ */}
          <form
            ref={formRef}
            id="mG61Hd"
            action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSe_HcqKO-7X2sX06bR4WHrcJW-M1yEeXbxUhvkWRXCydxMzqw/formResponse?pli=1"
            target="_self"
            method="POST"
            jsmodel="TOfxwf Q91hve CEkLOc"
            data-shuffle-seed="-3621453616046157585"
            data-first-entry="0"
            data-last-entry="6"
            data-is-first-page="true"
            onSubmit={handleSubmit}
            className="px-6 pt-6 pb-8 space-y-5"
          >
            {/* ── Name — entry.1251280127 ── */}
            <Field label="Name" icon={User} error={errors.name} index={0}>
              {/* Screen-reader heading nodes mirror Google Form aria anchors */}
              <div id="i1" className="sr-only" role="heading" aria-level="3" aria-describedby="i5">
                Name<span id="i5" aria-label="Required question"> *</span>
              </div>
              <div id="i2" className="sr-only" />
              <input
                id="reg-name"
                name="entry.1251280127"
                type="text"
                className={inputCls}
                jsname="YPqjbf"
                jscontroller="pxq3x"
                autoComplete="off"
                tabIndex={0}
                aria-labelledby="i1 i4"
                aria-describedby="i2 i3"
                aria-disabled="false"
                required
                dir="auto"
                data-initial-dir="auto"
                data-initial-value=""
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange("name")}
              />
              <div id="i3" className="sr-only" role="alert" />
            </Field>

            {/* ── Email Address — entry.202692694 ── */}
            <Field label="Email Address" icon={Mail} error={errors.email} index={1}>
              <div id="i6" className="sr-only" role="heading" aria-level="3">Email Address</div>
              <div id="i7" className="sr-only" />
              <input
                id="reg-email"
                name="entry.202692694"
                type="text"
                className={inputCls}
                jsname="YPqjbf"
                jscontroller="pxq3x"
                autoComplete="off"
                tabIndex={0}
                aria-labelledby="i6 i9"
                aria-describedby="i7 i8"
                aria-disabled="false"
                dir="auto"
                data-initial-dir="auto"
                data-initial-value=""
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange("email")}
              />
              <div id="i8" className="sr-only" role="alert" />
            </Field>

            {/* ── Phone Number — entry.1892370601 ── */}
            <Field label="Phone Number" icon={Phone} error={errors.phone} index={2}>
              <div id="i11" className="sr-only" role="heading" aria-level="3" aria-describedby="i15">
                Phone Number<span id="i15" aria-label="Required question"> *</span>
              </div>
              <div id="i12" className="sr-only" />
              <input
                id="reg-phone"
                name="entry.1892370601"
                type="text"
                className={inputCls}
                jsname="YPqjbf"
                jscontroller="pxq3x"
                autoComplete="off"
                tabIndex={0}
                aria-labelledby="i11 i14"
                aria-describedby="i12 i13"
                aria-disabled="false"
                required
                dir="auto"
                data-initial-dir="auto"
                data-initial-value=""
                placeholder="10-digit mobile number"
                maxLength={10}
                value={form.phone}
                onChange={handleChange("phone")}
              />
              <div id="i13" className="sr-only" role="alert" />
            </Field>

            {/* divider */}
            <motion.div variants={fadeUp} custom={3} className="h-px bg-stone-100" />

            {/* ── Click Here to Pay ── */}
            <motion.div variants={fadeUp} custom={4}>
              <motion.a
                href="upi://pay?pa=santoshsuryawanshi7722@sbi&pn=santoshsuryawanshi"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 rounded-[9px] font-bold text-sm tracking-widest text-white shadow-lg flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%)",
                }}
              >
                ✦ Click Here to Pay ✦
              </motion.a>
            </motion.div>

            {/* ── Payment Screenshot — entry 1938280864 (fuIds) ── */}
            <Field
              label="Add Payment Screenshot Here"
              icon={ImageIcon}
              error={errors.paymentFile}
              index={5}
            >
              {/* Google Forms file-upload aria anchors */}
              <div id="i16" className="sr-only" role="heading" aria-level="3" aria-describedby="i20">
                Add Payment Screenshot Here
                <span id="i20" aria-label="Required question"> *</span>
              </div>
              <div id="i17" className="sr-only" />
              <div id="i21" className="text-[11px] text-stone-400 mb-1">
                Upload 1 supported file. Max 10 MB.
              </div>

              <motion.label
                htmlFor="reg-payment-file"
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFileChange(e.dataTransfer.files[0]);
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed rounded-[9px] py-6 px-4 text-center transition-all duration-200 ${
                  dragOver
                    ? "border-green-500 bg-green-50"
                    : form.paymentFile
                      ? "border-green-400 bg-green-50/60"
                      : "border-stone-300 bg-stone-50 hover:border-green-400 hover:bg-green-50/40"
                }`}
              >
                {form.paymentFile ? (
                  <>
                    <CheckCircle className="w-7 h-7 text-green-600" />
                    <p className="text-green-700 text-sm font-semibold">
                      {form.paymentFile.name}
                    </p>
                    <p className="text-stone-400 text-[11px]">
                      Tap to change file
                    </p>
                  </>
                ) : (
                  <>
                    {/* Google Forms "Add File" button — jsname="mWZCyf" */}
                    <div
                      role="button"
                      jscontroller="VXdfxd"
                      jsname="mWZCyf"
                      aria-label="Add File"
                      tabIndex={0}
                      aria-labelledby="i16 i19"
                      aria-describedby="i17 i21 i18 i22"
                      aria-disabled="false"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-300 bg-white shadow-sm hover:shadow-md hover:border-green-500 hover:text-green-700 text-stone-600 text-sm font-semibold transition-all duration-200 cursor-pointer select-none"
                      onClick={() => document.getElementById("reg-payment-file").click()}
                      onKeyDown={(e) => e.key === "Enter" && document.getElementById("reg-payment-file").click()}
                    >
                      <div jsname="ksKsZd" className="hidden" />
                      <span jsslot="" className="flex items-center gap-2">
                        <span className="E6FpNe Ce1Y1c">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                            <g transform="translate(-3, -3)">
                              <path d="M6,14.25 L7.5,14.25 L7.5,16.5 L16.5,16.5 L16.5,14.25 L18,14.25 L18,16.5 C18,17.325 17.325,18 16.5,18 L7.5,18 C6.675,18 6,17.325 6,16.5 L6,14.25 Z M9.3075,10.8075 L11.25,8.8725 L11.25,15 L12.75,15 L12.75,8.8725 L14.6925,10.815 L15.75,9.75 L12,6 L8.25,9.75 L9.3075,10.8075 Z" />
                              <path fill="none" />
                            </g>
                          </svg>
                        </span>
                        <span id="i19" className="NPEfkd RveJvd snByac">Add File</span>
                      </span>
                    </div>
                    <div id="i22" className="text-[10px] text-stone-400">Required</div>
                    <p className="text-stone-400 text-[11px]">
                      or drag &amp; drop — JPG, PNG, WEBP
                    </p>
                  </>
                )}

                {/*
                  File input — name intentionally omitted.
                  Google Forms file uploads require Google Drive OAuth
                  and cannot be submitted via a plain HTML POST.
                  Removing the name attribute prevents a blank file field
                  from reaching Google Forms and triggering its "required" error.
                  The picker still gives the user local confirmation they selected a file.
                */}
                <input
                  id="reg-payment-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  jsname="mWZCyf"
                  jscontroller="VXdfxd"
                  tabIndex={-1}
                  aria-labelledby="i16 i19"
                  aria-describedby="i17 i21 i18 i22"
                  aria-disabled="false"
                  data-initial-value=""
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
              </motion.label>
              <div id="i18" className="sr-only" role="alert" />
            </Field>

            {/* ── Submit — jsname="M2UYVd" ── */}
            <motion.div variants={scaleIn}>
              <motion.div
                role="button"
                jscontroller="VXdfxd"
                jsname="M2UYVd"
                aria-label="Submit"
                tabIndex={0}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmitClick}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSubmitClick()}
                className="w-full py-4 rounded-[9px] font-bold text-base tracking-widest text-white shadow-xl cursor-pointer flex items-center justify-center gap-2 relative overflow-hidden"
                style={{ backgroundColor: "#15803d" }}
              >
                <div jsname="ksKsZd" className="absolute inset-0 rounded-[9px] pointer-events-none" />
                <span jsslot="" className="flex items-center justify-center gap-2">
                  <Leaf className="w-4 h-4" />
                  <span className="NPEfkd RveJvd snByac">Submit</span>
                </span>
              </motion.div>
            </motion.div>

            {/* ══ Google Forms required hidden fields ══ */}
            <input type="hidden" name="fvv" value="1" />
            <input type="hidden" name="partialResponse" value='[null,null,"-3621453616046157585"]' />
            {/*
              fuIds removed — including it would signal Google Forms to
              expect a file upload, triggering the Drive OAuth requirement.
            */}
            <input type="hidden" name="pageHistory" value="0" />
            <input type="hidden" name="fbzx" value="-3621453616046157585" />
            <input type="hidden" name="submissionTimestamp" value="-1" />

            <motion.p
              variants={fadeUp}
              custom={7}
              className="text-center text-[11px] text-stone-400 leading-relaxed"
            >
              By submitting, you agree to our terms.{" "}
              <span className="text-amber-600 font-semibold">
                हर ग्राम स्वग्राम
              </span>
            </motion.p>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Registration;
