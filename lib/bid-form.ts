export const preferredContactOptions = ["email", "phone"] as const;
export type PreferredContact = (typeof preferredContactOptions)[number];

export type BidFormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  bidDueDate: string;
  plansLink: string;
  details: string;
  preferredContact: PreferredContact;
};

export type BidFormErrors = Partial<Record<keyof BidFormValues, string>>;

export const emptyBidForm: BidFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  location: "",
  projectType: "",
  bidDueDate: "",
  plansLink: "",
  details: "",
  preferredContact: "email",
};

/** Field order drives which invalid field receives focus first. */
export const bidFieldOrder: Array<keyof BidFormValues> = [
  "name",
  "company",
  "email",
  "phone",
  "location",
  "projectType",
  "bidDueDate",
  "plansLink",
  "details",
  "preferredContact",
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const LIMITS: Partial<Record<keyof BidFormValues, number>> = { details: 5000 };

export function todayLocalISO() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * Shared by the browser form and the API route.
 * `today` enables the past-date check; the server omits it to avoid timezone drift.
 */
export function validateBidForm(v: BidFormValues, opts: { projectTypes: readonly string[]; today?: string }): BidFormErrors {
  const e: BidFormErrors = {};
  const t = (s: string) => s.trim();

  if (!t(v.name)) e.name = "Enter your name.";
  if (!t(v.company)) e.company = "Enter your company or organization.";

  if (!t(v.email)) e.email = "Enter an email address.";
  else if (!EMAIL.test(t(v.email))) e.email = "Enter a valid email address, like name@company.com.";

  const digits = v.phone.replace(/\D/g, "");
  if (v.preferredContact === "phone" && !digits) e.phone = "Enter a phone number, or choose email as the preferred contact method.";
  else if (digits && (digits.length < 10 || digits.length > 15)) e.phone = "Enter a 10-digit phone number, including area code.";

  if (!t(v.location)) e.location = "Enter the project location (address, neighborhood, or town).";

  if (!t(v.projectType)) e.projectType = "Select a project type.";
  else if (!opts.projectTypes.includes(v.projectType)) e.projectType = "Select a project type from the list.";

  if (t(v.bidDueDate)) {
    if (!DATE.test(v.bidDueDate) || Number.isNaN(Date.parse(v.bidDueDate))) e.bidDueDate = "Enter a valid date.";
    else if (opts.today && v.bidDueDate < opts.today) e.bidDueDate = "The bid due date is in the past.";
  }

  if (t(v.plansLink)) {
    try {
      const u = new URL(t(v.plansLink));
      if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error();
    } catch {
      e.plansLink = "Enter a full link starting with https://";
    }
  }

  if (!t(v.details)) e.details = "Describe the project scope, schedule, or bid package.";
  else if (t(v.details).length < 20) e.details = "Add a little more detail (at least 20 characters).";
  else if (v.details.length > (LIMITS.details ?? Infinity)) e.details = "Keep project details under 5,000 characters.";

  if (!preferredContactOptions.includes(v.preferredContact)) e.preferredContact = "Choose a preferred contact method.";

  for (const key of bidFieldOrder) {
    const val = v[key];
    if (key !== "details" && typeof val === "string" && val.length > 300 && !e[key]) e[key] = "This entry is too long.";
  }

  return e;
}
