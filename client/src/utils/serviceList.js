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
      //case นี้โดนละเว้นไว้เนื่องจากต้องใช้สถิติการใช้งานของ user
      sortedServices.sort((a, b) => {
        return b.popularity - a.popularity;
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
          "Test recommend 1",
          "Test recommend 2",
          "Test recommend 3",
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
