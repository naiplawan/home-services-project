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
