/* ======================================================================
   VATHANA SCHOOL PLANNER — script.js
   Mobile-first school schedule, learning & bag assistant.
   Cambodia timezone: Asia/Phnom_Penh
   ====================================================================== */

const TZ = "Asia/Phnom_Penh";

/* ---------- ICONS ---------- */
const ICON = {
  khmer: "assets/icons/icons8-angkor-wat-24.png",
  english: "assets/icons/icons8-english-50.png",
  chemistry: "assets/icons/icons8-experiment-24.png",
  earth: "assets/icons/icons8-earth-48.png",
  sport: "assets/icons/icons8-sport-48.png",
  civics: "assets/icons/icons8-leader-24.png",
  math: "assets/icons/icons8-math-48.png",
  biology: "assets/icons/icons8-biotech-24.png",
  physics: "assets/icons/icons8-physics-50.png",
  history: "assets/icons/icons8-history-24.png",
  geography: "assets/icons/icons8-geography-48.png",
  computer: "assets/icons/icons8-computer-24.png",
  flag: "assets/icons/icons8-cambodia-48.png",
  home_ec: "assets/icons/icons8-national-48.png",
  free: null
};

/* ---------- SUBJECT DICTIONARY (id -> names/icon/accent) ----------
   accent: a subtle professional accent color used for icon chips & borders */
const SUBJECTS = {
  khmer:      { en: "Khmer Language",   km: "ភាសាខ្មែរ",      icon: ICON.khmer,     accent: "#7C3AED" },
  english:    { en: "English",          km: "ភាសាអង់គ្លេស",   icon: ICON.english,   accent: "#0D9488" },
  chemistry:  { en: "Chemistry",        km: "គីមីវិទ្យា",      icon: ICON.chemistry, accent: "#EA580C" },
  earth:      { en: "Earth Science",    km: "ផែនដី",          icon: ICON.earth,     accent: "#059669" },
  sport:      { en: "Physical Ed.",     km: "កីឡា",           icon: ICON.sport,     accent: "#DC2626" },
  civics:     { en: "Civics",           km: "ពលរដ្ឋ",         icon: ICON.civics,    accent: "#475569" },
  home_ec:    { en: "Home Economics",   km: "គេហៈ",           icon: ICON.home_ec,   accent: "#B45309" },
  math:       { en: "Mathematics",      km: "គណិតវិទ្យា",      icon: ICON.math,      accent: "#2563EB" },
  biology:    { en: "Biology",          km: "ជីវវិទ្យា",       icon: ICON.biology,   accent: "#16A34A" },
  physics:    { en: "Physics",          km: "រូបវិទ្យា",       icon: ICON.physics,   accent: "#4F46E5" },
  history:    { en: "History",          km: "ប្រវត្តិវិទ្យា",   icon: ICON.history,   accent: "#B91C1C" },
  geography:  { en: "Geography",        km: "ភូមិវិទ្យា",       icon: ICON.geography, accent: "#0E7490" },
  computer:   { en: "Computer Studies", km: "កុំព្យូទ័រ",       icon: ICON.computer,  accent: "#1D4ED8" },
  free:       { en: "Free Time",        km: "ពេលទំនេរ",       icon: null,           accent: "#64748B" }
};
function subjAccent(key) { return (SUBJECTS[key] && SUBJECTS[key].accent) || "#2563EB"; }
function hexToRgba(hex, a) {
  const h = hex.replace("#","");
  const r = parseInt(h.substring(0,2),16), g = parseInt(h.substring(2,4),16), b = parseInt(h.substring(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}
function freeDot() {
  return '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.4"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
}
function editIcon() {
  return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 20h9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}
function trashIcon() {
  return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}
function checkIcon(checked) {
  return checked
    ? '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="4" fill="currentColor"/><path d="M4.5 8.2l2.3 2.3 4.7-5.2" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    : '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="13" height="13" rx="3.5" stroke="currentColor" stroke-width="1.4"/></svg>';
}

/* ---------- DEFAULT WEEKLY TIMETABLE ----------
   day index: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
   Each period: { start:"HH:MM", end:"HH:MM", subj: key } */
const DEFAULT_TIMETABLE = {
  1: [ // Monday
    { start: "07:00", end: "08:00", subj: "khmer" },
    { start: "08:00", end: "09:00", subj: "khmer" },
    { start: "09:00", end: "10:00", subj: "chemistry" },
    { start: "10:00", end: "11:00", subj: "earth" },
    { start: "14:00", end: "15:00", subj: "sport" },
    { start: "15:00", end: "16:00", subj: "civics" },
    { start: "16:00", end: "17:00", subj: "free" }
  ],
  2: [ // Tuesday
    { start: "07:00", end: "08:00", subj: "english" },
    { start: "08:00", end: "09:00", subj: "english" },
    { start: "09:00", end: "10:00", subj: "home_ec" },
    { start: "10:00", end: "11:00", subj: "free" },
    { start: "14:00", end: "15:00", subj: "math" },
    { start: "15:00", end: "16:00", subj: "math" },
    { start: "16:00", end: "17:00", subj: "free" }
  ],
  3: [ // Wednesday
    { start: "07:00", end: "08:00", subj: "english" },
    { start: "08:00", end: "09:00", subj: "english" },
    { start: "09:00", end: "10:00", subj: "math" },
    { start: "10:00", end: "11:00", subj: "math" },
    { start: "14:00", end: "15:00", subj: "khmer" },
    { start: "15:00", end: "16:00", subj: "khmer" },
    { start: "16:00", end: "17:00", subj: "sport" }
  ],
  4: [ // Thursday — cleaning day
    { start: "07:00", end: "08:00", subj: "chemistry" },
    { start: "08:00", end: "09:00", subj: "civics" },
    { start: "09:00", end: "10:00", subj: "biology" },
    { start: "10:00", end: "11:00", subj: "physics" },
    { start: "14:00", end: "15:00", subj: "history" },
    { start: "15:00", end: "16:00", subj: "geography" },
    { start: "16:00", end: "17:00", subj: "free" }
  ],
  5: [ // Friday
    { start: "07:00", end: "08:00", subj: "math" },
    { start: "08:00", end: "09:00", subj: "math" },
    { start: "09:00", end: "10:00", subj: "khmer" },
    { start: "10:00", end: "11:00", subj: "khmer" },
    { start: "14:00", end: "15:00", subj: "free" },
    { start: "15:00", end: "16:00", subj: "free" },
    { start: "16:00", end: "17:00", subj: "free" }
  ],
  6: [ // Saturday
    { start: "07:00", end: "08:00", subj: "computer" },
    { start: "08:00", end: "09:00", subj: "computer" },
    { start: "09:00", end: "10:00", subj: "physics" },
    { start: "10:00", end: "11:00", subj: "history" },
    { start: "14:00", end: "15:00", subj: "free" },
    { start: "15:00", end: "16:00", subj: "free" },
    { start: "16:00", end: "17:00", subj: "free" }
  ],
  0: [] // Sunday — no school
};

const DAY_NAMES = {
  0: { en: "Sunday",    km: "ថ្ងៃអាទិត្យ" },
  1: { en: "Monday",    km: "ថ្ងៃចន្ទ" },
  2: { en: "Tuesday",   km: "ថ្ងៃអង្គារ" },
  3: { en: "Wednesday", km: "ថ្ងៃពុធ" },
  4: { en: "Thursday",  km: "ថ្ងៃព្រហស្បតិ៍" },
  5: { en: "Friday",    km: "ថ្ងៃសុក្រ" },
  6: { en: "Saturday",  km: "ថ្ងៃសៅរ៍" }
};

const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday-first for timetable tabs

/* ---------- DEFAULT BOOK -> SUBJECT ASSIGNMENTS ---------- */
const DEFAULT_BOOKS = [
  { id: "b_khmer",  name: "Khmer Book",        subjects: ["khmer"] },
  { id: "b_eng",    name: "English Book",      subjects: ["english"] },
  { id: "b_math",   name: "Mathematics Book",  subjects: ["math"] },
  { id: "b_chem",   name: "Chemistry Book",    subjects: ["chemistry"] },
  { id: "b_earth",  name: "Earth Science Book",subjects: ["earth"] },
  { id: "b_pe",     name: "PE Materials",      subjects: ["sport"] },
  { id: "b_civ",    name: "Civics Book",       subjects: ["civics"] },
  { id: "b_home",   name: "Home Economics Book", subjects: ["home_ec"] },
  { id: "b_bio",    name: "Biology Book",      subjects: ["biology"] },
  { id: "b_phy",    name: "Physics Book",      subjects: ["physics"] },
  { id: "b_hist",   name: "History Book",      subjects: ["history"] },
  { id: "b_geo",    name: "Geography Book",    subjects: ["geography"] },
  { id: "b_comp",   name: "Computer Book",     subjects: ["computer"] },
  { id: "b_clean",  name: "Cleaning Materials",subjects: ["__thursday__"] }
];

/* ---------- TRANSLATIONS ---------- */
const I18N = {
  en: {
    nowLearning: "NOW LEARNING", next: "Next class:", freeTime: "Free Time",
    todaysProgress: "Today's Progress", todaySchedule: "Today's Schedule",
    todaysBooks: "Today's Books", tomorrowPreview: "Tomorrow's Preview",
    timetable: "Schedule", myBooks: "My Books", schoolBuddy: "Assistant",
    settings: "Settings", tomorrowBag: "Tomorrow's School Bag", allBooks: "All Books",
    addBook: "Add Book", tapBuddy: "Tap me!", language: "Language", theme: "Theme",
    light: "Light", dark: "Dark", afternoonEnd: "Afternoon Ending Time",
    breakDuration: "Free-Time Break Duration", reminders: "Reminders",
    r_before: "10 min before school", r_start: "School starting time",
    r_subject: "Subject changes", r_break: "Break ending",
    r_afternoon: "Afternoon starting", r_cleaning: "Cleaning duty",
    r_flag: "National Flag Ceremony", enableNotif: "Enable browser notifications",
    buddySettings: "Buddy", mascotSound: "Mascot sound", mascotAnim: "Mascot animations",
    editTimetable: "Edit Timetable",
    editTimetableHint: "Go to Timetable, tap any subject to rename it.",
    manageBooks: "Manage Books",
    manageBooksHint: "Go to My Books to add, edit, or delete books.",
    resetData: "Reset All Data", navHome: "Home", navTimetable: "Schedule",
    navBooks: "My Books", navBuddy: "Assistant", navSettings: "Settings",
    assistantLabel: "VATHANA ASSISTANT",
    bookName: "Book name", assignSubjects: "Assign to subjects", cancel: "Cancel",
    save: "Save", renameSubject: "Rename Subject", markDone: "Mark done",
    cleaningReminder: "Hey bro! Don't forget! Today is your turn to clean the classroom!",
    statusUpcoming: "Upcoming", statusNow: "Learning Now", statusDone: "Completed",
    statusFree: "Free Time", holiday: "Today is a rest day.",
    lessonsCompleted: n => `${n.done} of ${n.total} lessons completed`,
    tomorrowHoliday: "Tomorrow is a school holiday.",
    tomorrowCleaning: "Don't forget your classroom cleaning duty.",
    tomorrowFlag: "Remember the National Flag Ceremony.",
    tomorrowBooks: "Books needed:", tomorrowStart: "School starts at",
    packed: n => `${n.done} / ${n.total} packed`,
    deleteBook: "Delete", editBook: "Edit", noBooks: "No books yet. Add your first one!",
    ceremonyOngoing: "Ohh! You're still having គោរពទង់ជាតិ 🇰🇭",
    ceremonyOver: "Let's go! Time to start learning!",
    freeTimeStarted: "Yay! Free time! You have {m} minutes. Go relax!",
    freeTime5: "Hey bro! 5 minutes left!",
    freeTime2: "Get ready! Only 2 minutes!",
    freeTimeUp: "Time's up! Let's go back to class!",
    freeTimeOver: "Brooo! Your break is too long! You might miss your next lesson!",
    before650: "Hey bro! It's 6:50. Get ready for school!",
    at700: "Yoo! School starts now!",
    late710: "Brooo! You're late! Hurry up!",
    before150: "Yo bro! It's 1:50! Time to get ready for school!",
    at200: "YOO! Afternoon classes start now!",
    resetConfirm: "This will erase all your books, checklist and settings. Continue?"
  },
  km: {
    nowLearning: "កំពុងរៀន", next: "ថ្នាក់បន្ទាប់៖", freeTime: "ពេលទំនេរ",
    todaysProgress: "ដំណើរការថ្ងៃនេះ", todaySchedule: "កាលវិភាគថ្ងៃនេះ",
    todaysBooks: "សៀវភៅថ្ងៃនេះ", tomorrowPreview: "ព្រឹកស្អែក",
    timetable: "កាលវិភាគ", myBooks: "សៀវភៅរបស់ខ្ញុំ", schoolBuddy: "ជំនួយការ",
    settings: "ការកំណត់", tomorrowBag: "កាបូបសាលាថ្ងៃស្អែក", allBooks: "សៀវភៅទាំងអស់",
    addBook: "បន្ថែមសៀវភៅ", tapBuddy: "ចុចខ្ញុំ!", language: "ភាសា", theme: "រូបរាង",
    light: "ភ្លឺ", dark: "ងងឹត", afternoonEnd: "ម៉ោងបញ្ចប់ល្ងាច",
    breakDuration: "រយៈពេលសម្រាក", reminders: "ការរំលឹក",
    r_before: "10 នាទីមុនចូលរៀន", r_start: "ម៉ោងចូលរៀន",
    r_subject: "ការប្ដូរមុខវិជ្ជា", r_break: "ការបញ្ចប់ម៉ោងសម្រាក",
    r_afternoon: "ចូលរៀនល្ងាច", r_cleaning: "វេនសម្អាត",
    r_flag: "គោរពទង់ជាតិ", enableNotif: "បើកការជូនដំណឹងកម្មវិធីរុករក",
    buddySettings: "មិត្តភក្ដិ", mascotSound: "សំឡេងមិត្តភក្ដិ", mascotAnim: "ចលនាមិត្តភក្ដិ",
    editTimetable: "កែកាលវិភាគ",
    editTimetableHint: "ទៅកាលវិភាគ ហើយចុចលើមុខវិជ្ជាណាមួយដើម្បីប្ដូរឈ្មោះ។",
    manageBooks: "គ្រប់គ្រងសៀវភៅ",
    manageBooksHint: "ទៅទំព័រសៀវភៅរបស់ខ្ញុំដើម្បីបន្ថែម កែ ឬលុបសៀវភៅ។",
    resetData: "សម្អាតទិន្នន័យទាំងអស់", navHome: "ទំព័រដើម", navTimetable: "កាលវិភាគ",
    navBooks: "សៀវភៅ", navBuddy: "ជំនួយការ", navSettings: "ការកំណត់",
    assistantLabel: "ជំនួយការ VATHANA",
    bookName: "ឈ្មោះសៀវភៅ", assignSubjects: "ផ្ដល់ឲ្យមុខវិជ្ជា", cancel: "បោះបង់",
    save: "រក្សាទុក", renameSubject: "ប្ដូរឈ្មោះមុខវិជ្ជា", markDone: "បានធ្វើរួច",
    cleaningReminder: "នែ៎! កុំភ្លេចណា! ថ្ងៃនេះជាវេនសម្អាតថ្នាក់រៀនរបស់អ្នក!",
    statusUpcoming: "នឹងមកដល់", statusNow: "កំពុងរៀន", statusDone: "បានបញ្ចប់",
    statusFree: "ពេលទំនេរ", holiday: "ថ្ងៃនេះជាថ្ងៃឈប់សម្រាក។",
    lessonsCompleted: n => `បានរៀនចប់ ${n.done} ក្នុងចំណោម ${n.total} មេរៀន`,
    tomorrowHoliday: "ថ្ងៃស្អែកជាថ្ងៃឈប់សម្រាក។",
    tomorrowCleaning: "កុំភ្លេចវេនសម្អាតថ្នាក់រៀន។",
    tomorrowFlag: "កុំភ្លេចគោរពទង់ជាតិ។",
    tomorrowBooks: "សៀវភៅត្រូវយក៖", tomorrowStart: "ចូលរៀនម៉ោង",
    packed: n => `បានខ្ចប់ ${n.done} / ${n.total}`,
    deleteBook: "លុប", editBook: "កែ", noBooks: "មិនទាន់មានសៀវភៅទេ។ បន្ថែមមួយមើល៍!",
    ceremonyOngoing: "នែ៎! អ្នកកំពុងគោរពទង់ជាតិ 🇰🇭",
    ceremonyOver: "ទៅ! ដល់ពេលចូលរៀនហើយ!",
    freeTimeStarted: "យល់! ពេលទំនេរ! អ្នកមាន {m} នាទី សម្រាកបន្តិច!",
    freeTime5: "នែ៎! នៅ 5 នាទីទៀត!",
    freeTime2: "ត្រៀមខ្លួន! នៅ 2 នាទីទៀត!",
    freeTimeUp: "អស់ពេលហើយ! ទៅចូលថ្នាក់វិញ!",
    freeTimeOver: "នែ៎! សម្រាកយូរពេកហើយ! អ្នកអាចខកខានមេរៀនបន្ទាប់!",
    before650: "នែ៎! ម៉ោង 6:50 ហើយ! ត្រៀមខ្លួនទៅសាលា!",
    at700: "យូ! ចូលរៀនហើយ!",
    late710: "នែ៎! អ្នកយឺតហើយ! ប្រញាប់ទៅ!",
    before150: "នែ៎! ម៉ោង 1:50 ហើយ! ត្រៀមខ្លួនទៅសាលា!",
    at200: "យូ! ចូលរៀនល្ងាចហើយ!",
    resetConfirm: "វានឹងលុបសៀវភៅ បញ្ជីពិនិត្យ និងការកំណត់ទាំងអស់។ បន្ត?"
  }
};

const MASCOT_CLICK_MESSAGES = {
  en: [
    "Hey bro! Ready to learn?",
    "Have you packed your books?",
    "Don't forget your homework!",
    "Haha! Let's make today productive!",
    "You're doing great, keep going!",
    "Drink some water, bro!",
    "Smile! It's a good school day."
  ],
  km: [
    "នែ៎! ត្រៀមរៀនហើយឬនៅ?",
    "តើអ្នកខ្ចប់សៀវភៅហើយឬនៅ?",
    "កុំភ្លេចកិច្ចការផ្ទះ!",
    "ហា! ធ្វើថ្ងៃនេះឲ្យមានប្រយោជន៍!",
    "អ្នកធ្វើបានល្អណាស់ បន្តទៀត!",
    "ផឹកទឹកបន្តិច បង!",
    "ញញឹមចុះ! ថ្ងៃនេះល្អមែន។"
  ]
};

/* ======================================================================
   STATE & STORAGE
   ====================================================================== */
const LS_KEYS = {
  settings: "vathana_settings",
  timetable: "vathana_timetable",
  books: "vathana_books",
  pack: "vathana_pack_",       // + date string
  completed: "vathana_done_",  // + date string
  cleaningDone: "vathana_clean_", // + date string
  firedReminders: "vathana_fired_" // + date string
};

const DEFAULT_SETTINGS = {
  lang: "en",
  theme: "light",
  afternoonEnd: 17, // 16 or 17 (hour, 24h)
  breakMinutes: 10,
  reminders: { before: true, start: true, subject: true, breakEnd: true, afternoon: true, cleaning: true, flag: true },
  mascotSound: true,
  mascotAnim: true,
  notifPermAsked: false
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) { return fallback; }
}
function saveJSON(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
}

let settings = Object.assign({}, DEFAULT_SETTINGS, loadJSON(LS_KEYS.settings, {}));
settings.reminders = Object.assign({}, DEFAULT_SETTINGS.reminders, settings.reminders || {});
let timetable = loadJSON(LS_KEYS.timetable, null) || JSON.parse(JSON.stringify(DEFAULT_TIMETABLE));
let books = loadJSON(LS_KEYS.books, null) || JSON.parse(JSON.stringify(DEFAULT_BOOKS));

function persistSettings() { saveJSON(LS_KEYS.settings, settings); }
function persistTimetable() { saveJSON(LS_KEYS.timetable, timetable); }
function persistBooks() { saveJSON(LS_KEYS.books, books); }

/* ======================================================================
   TIME HELPERS (Asia/Phnom_Penh)
   ====================================================================== */
function nowParts() {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ, hour12: false, weekday: undefined,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  });
  const parts = {};
  fmt.formatToParts(new Date()).forEach(p => { parts[p.type] = p.value; });
  const weekdayFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "long" });
  const weekdayName = weekdayFmt.format(new Date());
  const weekdayIdx = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].indexOf(weekdayName);
  return {
    year: +parts.year, month: +parts.month, day: +parts.day,
    hour: +parts.hour, minute: +parts.minute, second: +parts.second,
    weekday: weekdayIdx,
    minutesOfDay: (+parts.hour) * 60 + (+parts.minute),
    dateKey: `${parts.year}-${parts.month}-${parts.day}`
  };
}
function hhmmToMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}
function minutesToLabel(mins, lang) {
  let h = Math.floor(mins / 60);
  const m = mins % 60;
  const ap = h >= 12 ? "PM" : "AM";
  let h12 = h % 12; if (h12 === 0) h12 = 12;
  return `${h12}:${String(m).padStart(2,"0")} ${ap}`;
}
function rangeLabel(start, end) {
  return `${minutesToLabel(hhmmToMinutes(start))} – ${minutesToLabel(hhmmToMinutes(end))}`;
}
function t(key, arg) {
  const dict = I18N[settings.lang] || I18N.en;
  const val = dict[key] !== undefined ? dict[key] : I18N.en[key];
  if (typeof val === "function") return val(arg);
  return val;
}
let customNames = loadJSON("vathana_custom_names", {});
function subjName(key) {
  if (customNames[key]) return customNames[key];
  const s = SUBJECTS[key];
  if (!s) return key;
  return settings.lang === "km" ? s.km : s.en;
}
function getDayPeriods(dayIdx) {
  const all = (timetable[dayIdx] || []).slice().sort((a,b)=>hhmmToMinutes(a.start)-hhmmToMinutes(b.start));
  const cutoff = settings.afternoonEnd * 60; // 16:00 or 17:00
  return all.filter(p => hhmmToMinutes(p.start) < cutoff);
}

/* ======================================================================
   SCHEDULE LOGIC
   ====================================================================== */
function periodStatus(period, minutesOfDay) {
  const s = hhmmToMinutes(period.start), e = hhmmToMinutes(period.end);
  if (minutesOfDay < s) return "upcoming";
  if (minutesOfDay >= s && minutesOfDay < e) return (period.subj === "free") ? "free" : "now";
  return "done";
}

function getCurrentAndNext(dayIdx, minutesOfDay) {
  const periods = getDayPeriods(dayIdx);
  let current = null, next = null;
  for (let i = 0; i < periods.length; i++) {
    const st = periodStatus(periods[i], minutesOfDay);
    if (st === "now" || st === "free") { current = periods[i]; next = periods[i+1] || null; break; }
    if (st === "upcoming" && !next) { next = periods[i]; }
  }
  if (!current) {
    // between periods (lunch gap, before/after school) -> find next upcoming
    for (let i = 0; i < periods.length; i++) {
      if (hhmmToMinutes(periods[i].start) > minutesOfDay) { next = periods[i]; break; }
    }
  }
  return { current, next, periods };
}

function dayProgress(dayIdx, minutesOfDay, manualDone) {
  const periods = getDayPeriods(dayIdx).filter(p => p.subj !== "free");
  let done = 0;
  periods.forEach(p => {
    const key = p.start + "_" + p.subj;
    const auto = periodStatus(p, minutesOfDay) === "done";
    if (auto || (manualDone && manualDone[key])) done++;
  });
  return { done, total: periods.length };
}

function booksForDay(dayIdx) {
  const periods = getDayPeriods(dayIdx);
  const subjSet = new Set(periods.map(p => p.subj).filter(s => s !== "free"));
  const isThursday = dayIdx === 4;
  const result = [];
  books.forEach(b => {
    const matches = b.subjects.some(s => subjSet.has(s) || (s === "__thursday__" && isThursday));
    if (matches) result.push(b);
  });
  return result;
}

function isFlagDay(dayIdx) { return dayIdx === 1 || dayIdx === 6; }
function isCleaningDay(dayIdx) { return dayIdx === 4; }

/* Apply configurable afternoon end to last period of each day's afternoon block (non-destructive view) */
function effectiveMinutesOfDayEnd() { return settings.afternoonEnd * 60; }

/* ======================================================================
   DOM REFS
   ====================================================================== */
const $ = id => document.getElementById(id);
let manualDone = {}; // in-memory cache of today's manual completion toggles
let freeTimerStart = null; // minutesOfDay when current free period began (for countdown baseline)
let overtimeWarned = false;
let lastMascotMsgIdx = -1;
let mascotClickCount = 0;
let miniClickCount = 0;
let lastMiniMsgIdx = -1;

function todayKey() { return nowParts().dateKey; }

function loadDayState(dateKey) {
  manualDone = loadJSON(LS_KEYS.completed + dateKey, {});
}
function saveDayState(dateKey) {
  saveJSON(LS_KEYS.completed + dateKey, manualDone);
}

/* ======================================================================
   RENDER: HOME PAGE
   ====================================================================== */
function renderHome(np) {
  const dayIdx = np.weekday;
  const periods = getDayPeriods(dayIdx);

  // Greeting + date
  const hour = np.hour;
  let greetKey = hour < 11 ? "Good Morning!" : hour < 17 ? "Good Afternoon!" : "Good Evening!";
  const greetKm = hour < 11 ? "អរុណសួស្តី!" : hour < 17 ? "សួស្តីពេលរសៀល!" : "សួស្តីពេលល្ងាច!";
  $("greetingText").textContent = settings.lang === "km" ? greetKm : greetKey;

  const dateFmt = new Intl.DateTimeFormat(settings.lang === "km" ? "km-KH" : "en-US", {
    timeZone: TZ, month: "long", day: "numeric"
  });
  const dayLabel = DAY_NAMES[dayIdx][settings.lang];
  $("dateLine").textContent = `${dayLabel}, ${dateFmt.format(new Date())}`;

  // Clock
  let h12 = np.hour % 12; if (h12 === 0) h12 = 12;
  $("clockTime").textContent = `${String(h12).padStart(2,"0")}:${String(np.minute).padStart(2,"0")}`;
  $("clockMeridian").textContent = np.hour >= 12 ? "PM" : "AM";

  renderBanners(np, dayIdx, periods);
  renderNowCard(np, dayIdx, periods);
  renderFreeTimeCard(np, dayIdx, periods);
  renderProgressCard(np, dayIdx);
  renderTodaySchedule(np, dayIdx, periods);
  renderTodayBooks(dayIdx);
  renderTomorrow(np, dayIdx);
  applyI18nStatic();
}

function renderBanners(np, dayIdx, periods) {
  const mins = np.minutesOfDay;
  // Ceremony
  const ceremonyCard = $("ceremonyCard");
  if (periods.length === 0 && dayIdx === 0) {
    ceremonyCard.classList.add("hidden");
  } else if (isFlagDay(dayIdx)) {
    ceremonyCard.classList.remove("hidden");
    if (mins >= 420 && mins < 440) { // 7:00-7:20
      $("ceremonyText").textContent = t("ceremonyOngoing");
      ceremonyCard.classList.add("pulse");
    } else {
      $("ceremonyText").textContent = settings.lang === "km"
        ? "ថ្ងៃនេះមានគោរពទង់ជាតិនៅម៉ោង ៧:០០"
        : "National Flag Ceremony today at 7:00 AM";
      ceremonyCard.classList.remove("pulse");
    }
  } else {
    ceremonyCard.classList.add("hidden");
  }

  // Cleaning
  const cleaningCard = $("cleaningCard");
  const dk = todayKey();
  const cleaningDone = loadJSON(LS_KEYS.cleaningDone + dk, false);
  if (isCleaningDay(dayIdx)) {
    cleaningCard.classList.remove("hidden");
    $("cleaningDoneBtn").style.display = cleaningDone ? "none" : "inline-block";
    $("cleaningText").textContent = cleaningDone
      ? (settings.lang === "km" ? "អបអរសាទរ! អ្នកបានសម្អាតរួចហើយ! ✅" : "Great job! Cleaning done! ✅")
      : t("cleaningReminder");
  } else {
    cleaningCard.classList.add("hidden");
  }

  // Sunday holiday banner reuse of ceremony card space via progress card text
}

function renderNowCard(np, dayIdx, periods) {
  const mins = np.minutesOfDay;
  const { current, next } = getCurrentAndNext(dayIdx, mins);
  const badge = $("nowStatusBadge");
  const icon = $("nowIcon");
  const subjEl = $("nowSubject");
  const timeEl = $("nowTime");
  const nextEl = $("nextSubject");
  const card = $("nowCard");

  const iconWrap = $("nowIconWrap");

  if (periods.length === 0) {
    subjEl.textContent = t("holiday");
    timeEl.textContent = "";
    badge.textContent = settings.lang === "km" ? "ថ្ងៃឈប់" : "Holiday";
    badge.className = "status-badge badge-upcoming";
    iconWrap.style.display = "none";
    nextEl.textContent = "—";
    card.classList.remove("active-glow");
    return;
  }

  if (current) {
    const isFree = current.subj === "free";
    iconWrap.style.display = isFree ? "none" : "flex";
    if (!isFree) {
      icon.src = SUBJECTS[current.subj].icon || "";
      const accent = subjAccent(current.subj);
      iconWrap.style.background = hexToRgba(accent, 0.12);
      iconWrap.style.setProperty("--accent", accent);
    }
    subjEl.textContent = subjName(current.subj);
    timeEl.textContent = rangeLabel(current.start, current.end);
    badge.textContent = isFree ? t("statusFree") : t("statusNow");
    badge.className = "status-badge " + (isFree ? "badge-free" : "badge-now");
    card.classList.toggle("active-glow", !isFree);
    nextEl.textContent = next ? `${subjName(next.subj)} — ${minutesToLabel(hhmmToMinutes(next.start))}` : "—";
  } else {
    iconWrap.style.display = "none";
    card.classList.remove("active-glow");
    badge.textContent = t("statusUpcoming");
    badge.className = "status-badge badge-upcoming";
    if (next) {
      subjEl.textContent = subjName(next.subj);
      timeEl.textContent = rangeLabel(next.start, next.end);
      nextEl.textContent = minutesToLabel(hhmmToMinutes(next.start));
    } else {
      subjEl.textContent = settings.lang === "km" ? "ចប់ថ្ងៃសិក្សា" : "School day finished";
      timeEl.textContent = "";
      nextEl.textContent = "—";
    }
  }
}

function renderFreeTimeCard(np, dayIdx, periods) {
  const mins = np.minutesOfDay;
  const { current } = getCurrentAndNext(dayIdx, mins);
  const card = $("freeTimeCard");
  if (!current || current.subj !== "free") {
    card.classList.add("hidden");
    freeTimerStart = null;
    overtimeWarned = false;
    return;
  }
  card.classList.remove("hidden");
  const periodStartMin = hhmmToMinutes(current.start);
  const elapsed = mins - periodStartMin;
  const allowance = settings.breakMinutes;
  const remaining = allowance - elapsed;

  const fill = $("freeBarFill");
  const pct = Math.max(0, Math.min(100, (elapsed / allowance) * 100));
  fill.style.width = pct + "%";
  fill.classList.toggle("over", remaining < 0);

  const msg = $("freeMsg");
  const cd = $("freeCountdown");
  if (remaining > 0) {
    const mm = Math.floor(remaining), ss = Math.floor((remaining % 1) * 60);
    cd.textContent = `${String(mm).padStart(2,"0")}:${String(Math.max(0, 59 - np.second === 60 ? 0 : (60-np.second)%60)).padStart(2,"0")}`;
    // simpler accurate countdown using seconds precisely:
    const totalSecRemain = Math.max(0, allowance*60 - (elapsed*60 + np.second));
    const mm2 = Math.floor(totalSecRemain/60), ss2 = totalSecRemain%60;
    cd.textContent = `${String(mm2).padStart(2,"0")}:${String(ss2).padStart(2,"0")}`;
    if (remaining <= 2) msg.textContent = t("freeTime2");
    else if (remaining <= 5) msg.textContent = t("freeTime5");
    else msg.textContent = t("freeTimeStarted").replace("{m}", allowance);
  } else {
    cd.textContent = "00:00";
    msg.textContent = t("freeTimeOver");
  }
}

function renderProgressCard(np, dayIdx) {
  if (getDayPeriods(dayIdx).length === 0) {
    $("progressFill").style.width = "0%";
    $("progressPct").textContent = "—";
    $("progressSub").textContent = t("holiday");
    return;
  }
  const { done, total } = dayProgress(dayIdx, np.minutesOfDay, manualDone);
  const pct = total ? Math.round((done/total)*100) : 0;
  $("progressFill").style.width = pct + "%";
  $("progressPct").textContent = pct + "%";
  $("progressSub").textContent = t("lessonsCompleted", { done, total });
}

function renderTodaySchedule(np, dayIdx, periods) {
  const list = $("todayScheduleList");
  list.innerHTML = "";
  if (periods.length === 0) {
    list.innerHTML = `<p class="empty-note">${t("holiday")}</p>`;
    return;
  }
  periods.forEach(p => {
    const st = periodStatus(p, np.minutesOfDay);
    const key = p.start + "_" + p.subj;
    const manuallyDone = manualDone[key];
    const effectiveStatus = manuallyDone && st !== "now" ? "done" : st;
    list.appendChild(scheduleRow(p, effectiveStatus, dayIdx, key));
  });
}

function scheduleRow(p, status, dayIdx, key) {
  const row = document.createElement("div");
  row.className = "sched-row status-" + status;
  const isFree = p.subj === "free";
  const accent = subjAccent(p.subj);
  row.style.setProperty("--accent", accent);
  row.innerHTML = `
    <span class="sched-bar"></span>
    <div class="sched-icon" style="background:${isFree ? 'transparent' : hexToRgba(accent,0.12)}">${isFree ? freeDot() : `<img src="${SUBJECTS[p.subj].icon || ''}" alt="">`}</div>
    <div class="sched-main">
      <p class="sched-subject">${subjName(p.subj)}</p>
      <p class="sched-time">${rangeLabel(p.start, p.end)}</p>
    </div>
    <div class="sched-right">
      <span class="status-chip chip-${status}">${t("status" + status.charAt(0).toUpperCase()+status.slice(1))}</span>
      ${!isFree ? `<button class="chk-btn ${status==='done'?'checked':''}" data-key="${key}" aria-label="toggle">${checkIcon(status==='done')}</button>` : ""}
    </div>`;
  if (!isFree) {
    row.querySelector(".chk-btn").addEventListener("click", () => {
      manualDone[key] = !manualDone[key];
      saveDayState(todayKey());
      tick();
    });
  }
  return row;
}

function renderTodayBooks(dayIdx) {
  const wrap = $("todayBooksList");
  wrap.innerHTML = "";
  const list = booksForDay(dayIdx);
  if (list.length === 0) {
    wrap.innerHTML = `<p class="empty-note">${t("noBooks")}</p>`;
    return;
  }
  list.forEach(b => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = b.name;
    wrap.appendChild(chip);
  });
}

function renderTomorrow(np, dayIdx) {
  const tIdx = (dayIdx + 1) % 7;
  const periods = getDayPeriods(tIdx);
  const card = $("tomorrowCard");
  const dayLabel = DAY_NAMES[tIdx][settings.lang];
  let html = `<p class="tmr-day">${dayLabel}</p>`;
  if (periods.length === 0) {
    html += `<p class="tmr-note">${t("tomorrowHoliday")}</p>`;
  } else {
    html += `<p class="tmr-note">${t("tomorrowStart")} ${minutesToLabel(hhmmToMinutes(periods[0].start))}</p>`;
    html += `<div class="tmr-subjects">`;
    periods.filter(p=>p.subj!=="free").forEach(p => {
      html += `<span class="chip small">${subjName(p.subj)}</span>`;
    });
    html += `</div>`;
    const tmrBooks = booksForDay(tIdx);
    if (tmrBooks.length) {
      html += `<p class="tmr-books-label">${t("tomorrowBooks")}</p><div class="tmr-subjects">`;
      tmrBooks.forEach(b => { html += `<span class="chip small">${b.name}</span>`; });
      html += `</div>`;
    }
    if (isCleaningDay(tIdx)) html += `<p class="tmr-special">${t("tomorrowCleaning")}</p>`;
    if (isFlagDay(tIdx)) html += `<p class="tmr-special">${t("tomorrowFlag")}</p>`;
  }
  card.innerHTML = html;
}

/* ======================================================================
   RENDER: TIMETABLE PAGE
   ====================================================================== */
let selectedTimetableDay = null;

function renderDayTabs(np) {
  const wrap = $("dayTabs");
  wrap.innerHTML = "";
  if (selectedTimetableDay === null) selectedTimetableDay = np.weekday;
  DAY_ORDER.forEach(d => {
    const btn = document.createElement("button");
    btn.className = "day-tab" + (d === selectedTimetableDay ? " active" : "") + (d === np.weekday ? " today" : "");
    btn.textContent = DAY_NAMES[d][settings.lang].slice(0, settings.lang === "km" ? 99 : 3);
    btn.addEventListener("click", () => { selectedTimetableDay = d; renderTimetablePage(nowParts()); });
    wrap.appendChild(btn);
  });
}

function renderTimetablePage(np) {
  renderDayTabs(np);
  const list = $("timetableList");
  list.innerHTML = "";
  const dayIdx = selectedTimetableDay;
  const periods = getDayPeriods(dayIdx);

  const badgeWrap = document.createElement("div");
  badgeWrap.className = "day-badge-row";
  if (isFlagDay(dayIdx)) {
    const b = document.createElement("span");
    b.className = "day-badge badge-flag";
    b.textContent = settings.lang==='km' ? 'គោរពទង់ជាតិ · 7:00–7:20' : 'NATIONAL FLAG CEREMONY · 7:00–7:20 AM';
    badgeWrap.appendChild(b);
  }
  if (isCleaningDay(dayIdx)) {
    const b = document.createElement("span");
    b.className = "day-badge badge-clean";
    b.textContent = settings.lang==='km' ? 'វេនសម្អាត' : 'CLEANING DUTY';
    badgeWrap.appendChild(b);
  }
  if (periods.length === 0) {
    const b = document.createElement("span");
    b.className = "day-badge badge-holiday";
    b.textContent = settings.lang==='km' ? 'ថ្ងៃឈប់សម្រាក' : 'HOLIDAY';
    badgeWrap.appendChild(b);
  }
  if (badgeWrap.children.length) list.appendChild(badgeWrap);

  if (periods.length === 0) {
    list.innerHTML += `<p class="empty-note">${t("holiday")}</p>`;
    return;
  }

  const np2 = nowParts();
  const isToday = dayIdx === np2.weekday;
  periods.forEach(p => {
    const st = isToday ? periodStatus(p, np2.minutesOfDay) : "upcoming";
    const key = p.start + "_" + p.subj;
    const row = scheduleRowEditable(p, st, dayIdx, key);
    list.appendChild(row);
  });
}

function scheduleRowEditable(p, status, dayIdx, key) {
  const row = scheduleRow(p, status, dayIdx, key);
  row.classList.add("editable");
  row.querySelector(".sched-main").addEventListener("click", () => openRenameModal(dayIdx, p));
  return row;
}

let renameTarget = null;
function openRenameModal(dayIdx, period) {
  renameTarget = { dayIdx, period };
  $("renameInput").value = subjName(period.subj);
  $("renameModal").classList.remove("hidden");
}

/* ======================================================================
   RENDER: MY BOOKS PAGE
   ====================================================================== */
function tomorrowDayIdx(np) { return (np.weekday + 1) % 7; }

function renderBooksPage(np) {
  renderPackList(np);
  renderBooksList();
}

function renderPackList(np) {
  const tIdx = tomorrowDayIdx(np);
  const needed = booksForDay(tIdx);
  const dk = todayKey();
  const packState = loadJSON(LS_KEYS.pack + dk, {});
  const wrap = $("packList");
  wrap.innerHTML = "";
  if (needed.length === 0) {
    wrap.innerHTML = `<p class="empty-note">${t("tomorrowHoliday")}</p>`;
    $("packFill").style.width = "0%";
    $("packSub").textContent = t("packed", { done: 0, total: 0 });
    return;
  }
  let done = 0;
  needed.forEach(b => {
    const checked = !!packState[b.id];
    if (checked) done++;
    const row = document.createElement("label");
    row.className = "pack-row";
    row.innerHTML = `<input type="checkbox" ${checked ? "checked" : ""} data-id="${b.id}"><span>${b.name}</span>`;
    row.querySelector("input").addEventListener("change", e => {
      packState[b.id] = e.target.checked;
      saveJSON(LS_KEYS.pack + dk, packState);
      renderPackList(nowParts());
    });
    wrap.appendChild(row);
  });
  const pct = Math.round((done / needed.length) * 100);
  $("packFill").style.width = pct + "%";
  $("packSub").textContent = t("packed", { done, total: needed.length });
}

function renderBooksList() {
  const wrap = $("booksList");
  wrap.innerHTML = "";
  if (books.length === 0) {
    wrap.innerHTML = `<p class="empty-note">${t("noBooks")}</p>`;
    return;
  }
  books.forEach(b => {
    const subjLabels = b.subjects.map(s => s === "__thursday__"
      ? (settings.lang==='km' ? 'ថ្ងៃសម្អាត' : 'Cleaning Day')
      : subjName(s)).join(", ");
    const row = document.createElement("div");
    row.className = "book-row";
    row.innerHTML = `
      <div class="book-main">
        <p class="book-name">${b.name}</p>
        <p class="book-subjects">${subjLabels || "—"}</p>
      </div>
      <div class="book-actions">
        <button class="icon-btn edit-book" data-id="${b.id}" aria-label="edit">${editIcon()}</button>
        <button class="icon-btn del-book" data-id="${b.id}" aria-label="delete">${trashIcon()}</button>
      </div>`;
    wrap.appendChild(row);
  });
  wrap.querySelectorAll(".edit-book").forEach(btn => btn.addEventListener("click", () => openBookModal(btn.dataset.id)));
  wrap.querySelectorAll(".del-book").forEach(btn => btn.addEventListener("click", () => {
    books = books.filter(b => b.id !== btn.dataset.id);
    persistBooks();
    renderBooksPage(nowParts());
  }));
}

let bookModalEditId = null;
function openBookModal(editId) {
  bookModalEditId = editId || null;
  const book = editId ? books.find(b => b.id === editId) : null;
  $("bookModalTitle").textContent = editId ? t("editBook") : t("addBook");
  $("bookNameInput").value = book ? book.name : "";
  const checksWrap = $("bookSubjectChecks");
  checksWrap.innerHTML = "";
  Object.keys(SUBJECTS).filter(k => k !== "free").forEach(key => {
    const checked = book && book.subjects.includes(key);
    const lab = document.createElement("label");
    lab.className = "subject-check";
    lab.innerHTML = `<input type="checkbox" value="${key}" ${checked ? "checked" : ""}><span>${subjName(key)}</span>`;
    checksWrap.appendChild(lab);
  });
  const cleanLab = document.createElement("label");
  cleanLab.className = "subject-check";
  const cleanChecked = book && book.subjects.includes("__thursday__");
  cleanLab.innerHTML = `<input type="checkbox" value="__thursday__" ${cleanChecked ? "checked" : ""}><span>🧹 ${settings.lang==='km'?'ថ្ងៃសម្អាត':'Cleaning Day'}</span>`;
  checksWrap.appendChild(cleanLab);
  $("bookModal").classList.remove("hidden");
}

/* ======================================================================
   RENDER: SETTINGS PAGE SYNC
   ====================================================================== */
function syncSettingsUI() {
  document.querySelectorAll("#langSeg .seg-btn").forEach(b => b.classList.toggle("active", b.dataset.val === settings.lang));
  document.querySelectorAll("#themeSeg .seg-btn").forEach(b => b.classList.toggle("active", b.dataset.val === settings.theme));
  document.querySelectorAll("#afternoonSeg .seg-btn").forEach(b => b.classList.toggle("active", +b.dataset.val === settings.afternoonEnd));
  $("breakSlider").value = settings.breakMinutes;
  $("breakVal").textContent = settings.breakMinutes + (settings.lang === "km" ? " នាទី" : " min");
  $("rem_before").checked = settings.reminders.before;
  $("rem_start").checked = settings.reminders.start;
  $("rem_subject").checked = settings.reminders.subject;
  $("rem_break").checked = settings.reminders.breakEnd;
  $("rem_afternoon").checked = settings.reminders.afternoon;
  $("rem_cleaning").checked = settings.reminders.cleaning;
  $("rem_flag").checked = settings.reminders.flag;
  $("mascotSound").checked = settings.mascotSound;
  $("mascotAnim").checked = settings.mascotAnim;
  document.documentElement.setAttribute("data-theme", settings.theme);
  document.documentElement.setAttribute("data-lang", settings.lang);
  document.documentElement.setAttribute("lang", settings.lang === "km" ? "km" : "en");
}

function applyI18nStatic() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const dict = I18N[settings.lang] || I18N.en;
    if (typeof dict[key] === "string") el.textContent = dict[key];
    else if (typeof I18N.en[key] === "string") el.textContent = I18N.en[key];
  });
}

/* ======================================================================
   MASCOT (cute SVG character, drawn in code — no external image)
   ====================================================================== */
function buddySvgMarkup(mood) {
  // Minimal, professional companion mark — abstract rounded-square avatar
  // with a thin-line face. mood: "happy" | "wink" | "excited" | "sleepy"
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const ring = isDark ? "#60A5FA" : "#2563EB";
  const face = isDark ? "#F9FAFB" : "#101828";
  const fillBg = isDark ? "#111827" : "#FFFFFF";

  const eyes = {
    happy:   `<path d="M80 96 a4 4 0 108 0 a4 4 0 10-8 0" fill="${face}"/><path d="M112 96 a4 4 0 108 0 a4 4 0 10-8 0" fill="${face}"/>`,
    wink:    `<path d="M78 97 h10" stroke="${face}" stroke-width="2.4" stroke-linecap="round"/><path d="M112 96 a4 4 0 108 0 a4 4 0 10-8 0" fill="${face}"/>`,
    excited: `<path d="M80 96 a4 4 0 108 0 a4 4 0 10-8 0" fill="${ring}"/><path d="M112 96 a4 4 0 108 0 a4 4 0 10-8 0" fill="${ring}"/>`,
    sleepy:  `<path d="M78 97 h10M110 97 h10" stroke="${face}" stroke-width="2.4" stroke-linecap="round"/>`
  };
  const mouth = {
    happy:   `<path d="M86 114 Q100 124 114 114" stroke="${face}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    wink:    `<path d="M86 114 Q100 122 114 114" stroke="${face}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    excited: `<rect x="92" y="110" width="16" height="10" rx="5" fill="${face}"/>`,
    sleepy:  `<path d="M92 115 h16" stroke="${face}" stroke-width="2.4" stroke-linecap="round"/>`
  };
  return `
    <rect x="30" y="20" width="140" height="140" rx="36" fill="${fillBg}" stroke="${ring}" stroke-width="2.5"/>
    <rect x="30" y="20" width="140" height="140" rx="36" fill="${ring}" opacity="0.06"/>
    ${eyes[mood] || eyes.happy}
    ${mouth[mood] || mouth.happy}
    <path d="M70 150 q30 18 60 0" stroke="${ring}" stroke-width="2" fill="none" opacity="0.35" stroke-linecap="round"/>
  `;
}

const MOODS = ["happy","wink","excited","sleepy"];
function paintBuddy(el, mood) { el.innerHTML = buddySvgMarkup(mood); }

function contextualMascotMessage(np, dayIdx, periods) {
  const mins = np.minutesOfDay;
  const lang = settings.lang;
  const { current } = getCurrentAndNext(dayIdx, mins);
  if (periods.length === 0) return lang==='km' ? "ថ្ងៃនេះឈប់សម្រាក! លេងសប្បាយណា!" : "No school today! Go have fun!";
  if (mins < 420) return lang==='km' ? "នែ៎! ព្រឹកសួស្តី! កុំភ្លេចសាលារៀម៉ោង ៧:០០!" : "Don't be late! School starts at 7:00!";
  if (current) {
    if (current.subj === "free") return lang==='km' ? "ទៅទិញអីញុំាបន្តិច សម្រាកចុះ!" : "Let's go buy some food and relax!";
    if (current.subj === "math") return lang==='km' ? "ហា! ថ្ងៃនេះរៀនគណិតវិទ្យា!" : "Haha! Today I'm learning Math!";
    if (current.subj === "english") return lang==='km' ? "ម៉ោងភាសាអង់គ្លេស! រៀនអីថ្មីទៀត!" : "English time! Let's learn something new!";
    return lang==='km' ? `កំពុងរៀន ${subjName(current.subj)}!` : `Now learning ${subjName(current.subj)}!`;
  }
  if (mins >= hhmmToMinutes("17:00") || (periods.length && mins > hhmmToMinutes(periods[periods.length-1].end)))
    return lang==='km' ? "ចប់សាលាហើយ! សម្រាកចុះ!" : "Finally! School is finished!";
  return lang==='km' ? "អរុណសួស្តី!" : "Hello bro! Good morning!";
}

function updateMascots(np, dayIdx, periods) {
  const msg = contextualMascotMessage(np, dayIdx, periods);
  const mood = MOODS[Math.floor(np.minutesOfDay / 37) % MOODS.length];
  const animOn = settings.mascotAnim;

  const homeIcon = $("buddyMiniMsg");
  if (homeIcon && miniClickCount === 0) homeIcon.textContent = msg;

  const bigMsgEl = $("buddyBigMsg");
  if (bigMsgEl && mascotClickCount === 0) bigMsgEl.textContent = msg;

  [$("buddySvg"), $("floatBuddySvg"), $("buddyMiniSvg")].forEach(svg => {
    if (!svg) return;
    paintBuddy(svg, mood);
    svg.classList.toggle("buddy-idle-anim", animOn);
  });
}

function playBeep() {
  if (!settings.mascotSound) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = "sine"; o.frequency.value = 880;
    g.gain.setValueAtTime(0.05, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.25);
  } catch (e) {}
}

function mascotClick() {
  const msgs = MASCOT_CLICK_MESSAGES[settings.lang] || MASCOT_CLICK_MESSAGES.en;
  let idx;
  do { idx = Math.floor(Math.random() * msgs.length); } while (idx === lastMascotMsgIdx && msgs.length > 1);
  lastMascotMsgIdx = idx;
  mascotClickCount++;
  $("buddyBigMsg").textContent = msgs[idx];
  const mood = MOODS[mascotClickCount % MOODS.length];
  paintBuddy($("buddySvg"), mood);
  playBeep();
}

function miniAssistantClick() {
  const msgs = MASCOT_CLICK_MESSAGES[settings.lang] || MASCOT_CLICK_MESSAGES.en;
  let idx;
  do { idx = Math.floor(Math.random() * msgs.length); } while (idx === lastMiniMsgIdx && msgs.length > 1);
  lastMiniMsgIdx = idx;
  miniClickCount++;
  $("buddyMiniMsg").textContent = msgs[idx];
  const mood = MOODS[miniClickCount % MOODS.length];
  const svg = $("buddyMiniSvg");
  if (svg) paintBuddy(svg, mood);
  playBeep();
}

function floatMascotClick() {
  const msgs = MASCOT_CLICK_MESSAGES[settings.lang] || MASCOT_CLICK_MESSAGES.en;
  let idx;
  do { idx = Math.floor(Math.random() * msgs.length); } while (idx === lastMascotMsgIdx && msgs.length > 1);
  lastMascotMsgIdx = idx;
  const bubble = $("floatBubble");
  bubble.textContent = msgs[idx];
  bubble.classList.remove("hidden");
  playBeep();
  clearTimeout(floatMascotClick._t);
  floatMascotClick._t = setTimeout(() => bubble.classList.add("hidden"), 3200);
}

/* ======================================================================
   NOTIFICATIONS / TIME-TRIGGERED REMINDERS
   ====================================================================== */
function fireNotification(title, body) {
  showToast(body);
  if (window.Notification && Notification.permission === "granted") {
    try { new Notification(title, { body, icon: "assets/icons/icons8-national-48.png" }); } catch (e) {}
  }
}

function showToast(msg) {
  const stack = $("bannerStack");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  stack.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 350); }, 4200);
}

function checkTimedReminders(np, dayIdx, periods) {
  const dk = todayKey();
  const fired = loadJSON(LS_KEYS.firedReminders + dk, {});
  const mins = np.minutesOfDay;
  const R = settings.reminders;

  function once(id, cond, cb) {
    if (cond && !fired[id]) { fired[id] = true; cb(); saveJSON(LS_KEYS.firedReminders + dk, fired); }
  }

  if (periods.length > 0) {
    if (R.before) once("before650", mins === 410, () => fireNotification("VATHANA", t("before650")));
    if (R.start) once("at700", mins === 420, () => fireNotification("VATHANA", t("at700")));
    if (R.start) once("late710", mins === 430, () => fireNotification("VATHANA", t("late710")));
    if (R.afternoon) once("before150", mins === 830, () => fireNotification("VATHANA", t("before150")));
    if (R.afternoon) once("at200", mins === 840, () => fireNotification("VATHANA", t("at200")));
    if (R.flag && isFlagDay(dayIdx)) once("flagStart", mins === 420, () => fireNotification("VATHANA", t("ceremonyOngoing")));
    if (R.flag && isFlagDay(dayIdx)) once("flagEnd", mins === 440, () => fireNotification("VATHANA", t("ceremonyOver")));
    if (R.cleaning && isCleaningDay(dayIdx)) once("cleaning", mins === 405, () => fireNotification("VATHANA", t("cleaningReminder")));

    // subject-change reminders: fire at the exact start minute of each non-free period (except the very first)
    if (R.subject) {
      periods.forEach((p, i) => {
        if (i === 0) return;
        const startMin = hhmmToMinutes(p.start);
        once("subj_" + p.start + "_" + p.subj, mins === startMin, () =>
          fireNotification("VATHANA", (settings.lang==='km' ? 'ម៉ោងនេះដល់ម៉ោង ' : 'Now starting: ') + subjName(p.subj)));
      });
    }
    // break-ending reminders: 5 min & 2 min left & time's up, per free period, using configured break length
    if (R.breakEnd) {
      periods.filter(p => p.subj === "free").forEach(p => {
        const startMin = hhmmToMinutes(p.start);
        const allowance = settings.breakMinutes;
        once("free5_" + p.start, mins === startMin + allowance - 5, () => fireNotification("VATHANA", t("freeTime5")));
        once("free2_" + p.start, mins === startMin + allowance - 2, () => fireNotification("VATHANA", t("freeTime2")));
        once("freeup_" + p.start, mins === startMin + allowance, () => fireNotification("VATHANA", t("freeTimeUp")));
        once("freestart_" + p.start, mins === startMin, () => fireNotification("VATHANA", t("freeTimeStarted").replace("{m}", allowance)));
      });
    }
  }
}

/* ======================================================================
   NAVIGATION
   ====================================================================== */
const PAGES = ["home", "timetable", "books", "buddy", "settings"];
function showPage(name) {
  PAGES.forEach(p => $("page-" + p).classList.toggle("active", p === name));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.page === name));
  $("floatMascot").style.display = (name === "home" || name === "buddy") ? "none" : "flex";
  renderCurrentPage();
}
function currentPageName() {
  for (const p of PAGES) if ($("page-" + p).classList.contains("active")) return p;
  return "home";
}
function renderCurrentPage() {
  const np = nowParts();
  const page = currentPageName();
  if (page === "home") renderHome(np);
  if (page === "timetable") renderTimetablePage(np);
  if (page === "books") renderBooksPage(np);
  if (page === "buddy") updateMascots(np, np.weekday, getDayPeriods(np.weekday));
  if (page === "settings") syncSettingsUI();
}

/* ======================================================================
   EVENT BINDINGS
   ====================================================================== */
function bindEvents() {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => showPage(btn.dataset.page));
  });

  $("cleaningDoneBtn").addEventListener("click", () => {
    saveJSON(LS_KEYS.cleaningDone + todayKey(), true);
    playBeep();
    renderCurrentPage();
  });

  $("buddyChar").addEventListener("click", mascotClick);
  $("floatMascot").addEventListener("click", floatMascotClick);
  $("buddyMiniHome").addEventListener("click", miniAssistantClick);
  $("settingsShortcut").addEventListener("click", () => showPage("settings"));

  // Settings: language
  $("langSeg").addEventListener("click", e => {
    const btn = e.target.closest(".seg-btn"); if (!btn) return;
    settings.lang = btn.dataset.val; persistSettings();
    syncSettingsUI(); renderCurrentPage();
  });
  // Theme
  $("themeSeg").addEventListener("click", e => {
    const btn = e.target.closest(".seg-btn"); if (!btn) return;
    settings.theme = btn.dataset.val; persistSettings();
    syncSettingsUI();
  });
  // Afternoon end
  $("afternoonSeg").addEventListener("click", e => {
    const btn = e.target.closest(".seg-btn"); if (!btn) return;
    settings.afternoonEnd = +btn.dataset.val; persistSettings();
    syncSettingsUI(); renderCurrentPage();
  });
  // Break slider
  $("breakSlider").addEventListener("input", e => {
    settings.breakMinutes = +e.target.value; persistSettings();
    syncSettingsUI(); renderCurrentPage();
  });
  // Reminder toggles
  const remMap = { rem_before:"before", rem_start:"start", rem_subject:"subject", rem_break:"breakEnd", rem_afternoon:"afternoon", rem_cleaning:"cleaning", rem_flag:"flag" };
  Object.keys(remMap).forEach(id => {
    $(id).addEventListener("change", e => { settings.reminders[remMap[id]] = e.target.checked; persistSettings(); });
  });
  $("mascotSound").addEventListener("change", e => { settings.mascotSound = e.target.checked; persistSettings(); });
  $("mascotAnim").addEventListener("change", e => { settings.mascotAnim = e.target.checked; persistSettings(); renderCurrentPage(); });

  $("notifPermBtn").addEventListener("click", () => {
    if (!window.Notification) { showToast("Notifications not supported on this browser."); return; }
    Notification.requestPermission().then(perm => {
      settings.notifPermAsked = true; persistSettings();
      showToast(perm === "granted" ? "Notifications enabled!" : "Notifications not enabled.");
    });
  });

  $("resetDataBtn").addEventListener("click", () => {
    if (confirm(t("resetConfirm"))) {
      const lang = settings.lang;
      Object.keys(localStorage).filter(k => k.startsWith("vathana_")).forEach(k => localStorage.removeItem(k));
      settings = Object.assign({}, DEFAULT_SETTINGS, { lang });
      timetable = JSON.parse(JSON.stringify(DEFAULT_TIMETABLE));
      books = JSON.parse(JSON.stringify(DEFAULT_BOOKS));
      customNames = {};
      persistSettings(); persistTimetable(); persistBooks();
      loadDayState(todayKey());
      syncSettingsUI(); renderCurrentPage();
      showToast("All data reset.");
    }
  });

  // Book modal
  $("addBookBtn").addEventListener("click", () => openBookModal(null));
  $("bookCancelBtn").addEventListener("click", () => $("bookModal").classList.add("hidden"));
  $("bookSaveBtn").addEventListener("click", () => {
    const name = $("bookNameInput").value.trim();
    if (!name) { showToast("Please enter a book name."); return; }
    const chosen = Array.from($("bookSubjectChecks").querySelectorAll("input:checked")).map(i => i.value);
    if (bookModalEditId) {
      const b = books.find(x => x.id === bookModalEditId);
      b.name = name; b.subjects = chosen;
    } else {
      const dup = books.some(b => b.name.toLowerCase() === name.toLowerCase());
      if (dup) { showToast("That book already exists."); return; }
      books.push({ id: "b_" + Date.now(), name, subjects: chosen });
    }
    persistBooks();
    $("bookModal").classList.add("hidden");
    renderBooksPage(nowParts());
  });

  // Rename modal
  $("renameCancelBtn").addEventListener("click", () => $("renameModal").classList.add("hidden"));
  $("renameSaveBtn").addEventListener("click", () => {
    const val = $("renameInput").value.trim();
    if (val && renameTarget) {
      customNames[renameTarget.period.subj] = val;
      saveJSON("vathana_custom_names", customNames);
    }
    $("renameModal").classList.add("hidden");
    renderCurrentPage();
  });

  document.querySelectorAll(".modal-overlay").forEach(ov => {
    ov.addEventListener("click", e => { if (e.target === ov) ov.classList.add("hidden"); });
  });
}

/* ======================================================================
   MAIN TICK LOOP
   ====================================================================== */
let lastDateKey = null;
function tick() {
  const np = nowParts();
  if (lastDateKey !== np.dateKey) {
    lastDateKey = np.dateKey;
    loadDayState(np.dateKey);
  }
  const periods = getDayPeriods(np.weekday);
  checkTimedReminders(np, np.weekday, periods);
  renderCurrentPage();
  updateMascots(np, np.weekday, periods);
}

function init() {
  loadDayState(todayKey());
  syncSettingsUI();
  bindEvents();
  showPage("home");
  tick();
  setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", init);
