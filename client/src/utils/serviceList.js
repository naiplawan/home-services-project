// เป็น function ที่เอาไว้คำนวณราคา sub service เพื่อเอาค่าต่ำสุดกับสูงสุดมาแสดงตรง display

export function getMinPrice(subServicesArray) {
  if (subServicesArray.length === 0) {
    return 0;
  }

  let minPrice = subServicesArray[0].price_per_unit;

  for (const subService of subServicesArray) {
    if (subService.price_per_unit < minPrice) {
      minPrice = subService.price_per_unit;
    }
  }

  return minPrice;
}

export function getMaxPrice(subServicesArray) {
  if (subServicesArray.length === 0) {
    return 0;
  }

  let maxPrice = subServicesArray[0].price_per_unit;

  for (const subService of subServicesArray) {
    if (subService.price_per_unit > maxPrice) {
      maxPrice = subService.price_per_unit;
    }
  }

  return maxPrice;
}

// function ของการเรียงของมูลใน sort by filter

function sortServices(services, orderFilter) {
  const sortedServices = [...services];

  const collator = new Intl.Collator("th", {
    sensitivity: "accent",
  });

  switch (orderFilter) {
    case "popular":
      // เรียงตามบริการยอดนิยม
      sortedServices.sort((a, b) => {
        const popularServiceNames = [
          "ทำความสะอาดทั่วไป",
          "ล้างแอร์",
          "ซ่อมเครื่องซักผ้า",
        ];

        // ใช้ indexOf เพื่อตรวจสอบว่าชื่อบริการของ a และ b อยู่ใน popularServiceNames หรือไม่
        const isAPopularServiceNames =
          popularServiceNames.indexOf(a.service_name) !== -1;
        const isBPopularServiceNames =
          popularServiceNames.indexOf(b.service_name) !== -1;

        // กรณีที่ a และ b ต่างกลุ่ม (a เป็น popularService และ b ไม่ใช่)
        if (isAPopularServiceNames && !isBPopularServiceNames) {
          return -1;
        } else if (!isAPopularServiceNames && isBPopularServiceNames) {
          return 1;
        } else {
          // ในกรณีอื่น ๆ ให้เรียงตาม service_name แบบปกติ
          return collator.compare(a.service_name, b.service_name);
        }
      });
      break;
    case "ascending":
      // เรียงตามตัวอักษร (ภาษาไทย asc)
      sortedServices.sort((a, b) => {
        return collator.compare(a.service_name, b.service_name);
      });
      break;
    case "descending":
      // เรียงตามตัวอักษร (ภาษาไทย desc)
      sortedServices.sort((a, b) => {
        return collator.compare(b.service_name, a.service_name);
      });
      break;
    case "recommend":
      // เรียงตามบริการที่เราจะแนะนำลูกค้า
      sortedServices.sort((a, b) => {
        const preferredServiceNames = [
          "ล้างแอร์",
          "ทำความสะอาดทั่วไป",
          "ซ่อมแอร์",
        ];

        // ใช้ indexOf เพื่อตรวจสอบว่าชื่อบริการของ a และ b อยู่ใน preferredServiceNames หรือไม่
        const isAPreferredService =
          preferredServiceNames.indexOf(a.service_name) !== -1;
        const isBPreferredService =
          preferredServiceNames.indexOf(b.service_name) !== -1;

        // กรณีที่ a และ b ต่างกลุ่ม (a เป็น preferredService และ b ไม่ใช่)
        if (isAPreferredService && !isBPreferredService) {
          return -1;
        } else if (!isAPreferredService && isBPreferredService) {
          return 1;
        } else {
          // ในกรณีอื่น ๆ ให้เรียงตาม service_name แบบปกติ
          return collator.compare(a.service_name, b.service_name);
        }
      });
      break;
    default:
      // ในกรณีที่ไม่ได้เลือกเรียงตามอะไรเลย ไม่ทำการเรียงหรือให้มันเรียงตามเงื่อนไขเริ่มต้น
      break;
  }

  return sortedServices; // คืนข้อมูลที่เรียงแล้ว
}

export { sortServices };

// function colors categories

export function getCategoryColor(categoryName) {
  switch (categoryName) {
    case "บริการห้องครัว":
      return "bg-[#ECE6FF] text-[#4512B4]";
    case "บริการห้องน้ำ":
      return "bg-[#DFF9F6] text-[#00596C]";
    default:
      return "bg-[#E7EEFF] text-[#0E3FB0]";
  }
}
