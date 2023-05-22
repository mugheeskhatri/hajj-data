export const inputs = [
  {
    name: "حج ایپلیکیشن نمبر",
    value: "hajjApplicationNumber",
    type: "text",
  },
  {
    name: "نام",
    value: "name",
    type: "text",
  },
  {
    name: "والد / شوہر کا نام",
    value: "fatherOrHusbandName",
    type: "text",
  },
  {
    name: "شناختی کارڈ",
    value: "NIC",
    type: "number",
    maxLength: "14",
  },
  {
    name: "تاریخ پیدائش",
    value: "DOB",
    type: "date",
    maxLength: "10",
  },
  {
    name: "عمر",
    value: "age",
    type: "number",
  },
  {
    name: "پاسپورٹ نمبر",
    value: "passport",
    type: "text",
    maxLength: "10",
  },
  {
    name: "تاریخ اجراء",
    value: "passportIssueDate",
    type: "date",
  },
  {
    name: "تاریخ تنسیخ",
    value: "passportExpireDate",
    type: "date",
  },
  {
    name: "موبائل نمبر",
    value: "mobile",
    type: "number",
    maxLength: "12",
  },
  {
    name: "موجودہ مکمّل پتا",
    value: "address",
    type: "text",
  },
  {
    name: "جنس",
    type: "dropdown",
    options: ["مرد", "عورت"],
    value: "gender",
    defaultVale: "مرد",
  },
  {
    name: "شادی شدہ",
    type: "dropdown",
    options: ["جی ہاں", "جی نہیں"],
    value: "maritalStatus",
    defaultVale: "جی ہاں ",
  },
  {
    name: "بلڈ گروپ",
    value: "bloogGroup",
    type: "text",
  },
  {
    name: "پہلے حج کیا ہوا ہے؟",
    type: "dropdown",
    options: ["جی ہاں", "جی نہیں"],
    value: "performHajjBefore",
    defaultVale: "جی ہاں",
  },
  {
    name: "محرم کا نام",
    type: "text",
    value: "mahramName",
  },
  {
    name: "محرم کے ساتھ رشتہ",
    type: "dropdown",
    value: "relationWithMahram",
    options: [
      "شوہر",
      "والد",
      "بھائی",
      "بیٹا",
      "دادا",
      "نانا",
      "سسر",
      "چچا",
      "ماموں",
      "ماموں",
      "بھتیجا",
      "پوتا",
      "نواسہ",
      "داماد",
    ],
    defaultVale: "شوہر",
  },
  {
    name: "نامزد کا نام",
    value: "Nomineename",
    type: "text",
  },
  {
    name: "نامزد کے ساتھ رشتہ",
    value: "relationWithNominee",
    type: "text",
  },
  {
    name: "نامزد کا شناختی کارڈ نمبر",
    value: "nomineeNic",
    type: "number",
    maxLength: "14",
  },
  {
    name: "نامزد کا فون  نمبر",
    value: "nomineePhone",
    type: "number",
    maxLength: "12",
  },
];

export const inputsWithoutNominee = [
  {
    name: "حج ایپلیکیشن نمبر",
    value: "hajjApplicationNumber",
    type: "text",
  },
  {
    name: "نام",
    value: "name",
    type: "text",
  },
  {
    name: "والد / شوہر کا نام",
    value: "fatherOrHusbandName",
    type: "text",
  },
  {
    name: "شناختی کارڈ",
    value: "NIC",
    type: "number",
    maxLength: "14",
  },
  {
    name: "تاریخ پیدائش",
    value: "DOB",
    type: "date",
    maxLength: "8",
  },
  {
    name: "عمر",
    value: "age",
    type: "number",
  },
  {
    name: "پاسپورٹ نمبر",
    value: "passport",
    type: "text",
    maxLength: "10",
  },
  {
    name: "تاریخ اجراء",
    value: "passportIssueDate",
    type: "date",
  },
  {
    name: "تاریخ تنسیخ",
    value: "passportExpireDate",
    type: "date",
  },
  {
    name: "موبائل نمبر",
    value: "mobile",
    type: "number",
    maxLength: "12",
  },
  {
    name: "مکمّل پتا",
    value: "address",
    type: "text",
  },
  {
    name: "جنس",
    type: "dropdown",
    options: ["مرد", "عورت"],
    value: "gender",
    defaultVale: "مرد",
  },
  {
    name: "شادی شدہ",
    type: "dropdown",
    options: ["جی ہاں", "جی نہیں"],
    value: "maritalStatus",
    defaultVale: "جی ہاں ",
  },
  {
    name: "بلڈ گروپ",
    value: "bloodGroup",
    type: "text",
  },
  {
    name: "پہلے حج کیا ہوا ہے؟",
    type: "dropdown",
    options: ["جی ہاں", "جی نہیں"],
    value: "performHajjBefore",
    defaultVale: "جی ہاں",
  },
  {
    name: "محرم کا نام",
    type: "text",
    value: "mahramName",
  },
  {
    name: "محرم کے ساتھ رشتہ",
    type: "dropdown",
    value: "relationWithMahram",
    options: [
      "شوہر",
      "والد",
      "بھائی",
      "بیٹا",
      "دادا",
      "نانا",
      "سسر",
      "چچا",
      "ماموں",
      "ماموں",
      "بھتیجا",
      "پوتا",
      "نواسہ",
      "داماد",
    ],
    defaultVale: "شوہر",
  },
];

export const nomineeData = [
  {
    name: "نامزد کا نام",
    value: "Nomineename",
    type: "text",
  },
  {
    name: "نامزد کے ساتھ رشتہ",
    value: "relationWithNominee",
    type: "text",
  },
  {
    name: "نامزد کا شناختی کارڈ نمبر",
    value: "nomineeNic",
    type: "number",
    maxLength: "14",
  },
  {
    name: "نامزد کا فون  نمبر",
    value: "nomineePhone",
    type: "number",
    maxLength: "12",
  },
];

export const groupInputs = [
  {
    name: "گروپ کا نام",
    value: "groupName",
    type: "text",
  },
  // {
  //   name: "گروپ لیڈر کا نام",
  //   value: "groupLeaderName",
  //   type: "text",
  // },
  // {
  //   name: "گروپ لیڈر کا شناختی کارڈ",
  //   value: "groupLeaderNIC",
  //   type: "number",
  //   maxLength: "14",
  // },
];

export const tableHeaders = [
  "نام",
  "شناختی کارڈ",
  "جنس",
  "عمر",
  "فون نمبر",
  "ایکشنز",
];

export const groupTableHeaders = [
  "گروپ کا نام",
  "گروپ لیڈر کا نام",
  "گروپ لیڈر کا فون نمبر",
  "ممبران کی تعداد",
  "ایکشنز",
];
