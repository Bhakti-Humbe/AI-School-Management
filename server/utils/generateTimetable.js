// server/utils/generateTimetable.js
class MaxHeap {
  constructor(subjects) {
    // Each subject: { name, quota }
    this.data = [...subjects];
  }

  getNext() {
    this.data.sort((a, b) => b.quota - a.quota);
    const top = this.data[0];
    if (!top || top.quota === 0) return "Free";
    top.quota -= 1;
    return top.name;
  }
}

export function generateTimetable(days, slots, subjects) {
  const timetable = [];
  const heap = new MaxHeap(subjects);

  days.forEach((day) => {
    const row = [];
    slots.forEach((slot) => {
      if (slot === "BREAK") {
        row.push({ time: slot, subject: "BREAK" });
      } else {
        const sub = heap.getNext();
        row.push({ time: slot, subject: sub });
      }
    });
      timetable.push({ day, slots: row });

  });

  return timetable;
}
