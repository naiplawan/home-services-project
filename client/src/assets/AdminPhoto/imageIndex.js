import editIcon from "./edit-icon.png";
import trashIcon from "./trash-icon.png";
import plusSign from "./plus-sign.svg";
import coupon from "./coupon.svg";
import category from "./category.svg";
import service from "./paper.svg";
import logout from "./logoutIcon.svg";
import exclamation from "./exclamation.png";
import arrow from "./arrow.png";
import addPhoto from "./add-photo.png";
import bluePlusSymbol from "./blue-plus-symbol.png";
import minus from "./minus.png";
import orderIcon from "./orderIcon.svg";
import logoHomeService from "../HouseIcon.svg";
import Frame from "../AdminPhoto/Frame.svg"

const assetUrl = (asset) => (typeof asset === "string" ? asset : asset?.src);

const image = {
  editIcon: assetUrl(editIcon),
  trashIcon: assetUrl(trashIcon),
  plusSign: assetUrl(plusSign),
  bluePlusSymbol: assetUrl(bluePlusSymbol),
  coupon: assetUrl(coupon),
  service: assetUrl(service),
  category: assetUrl(category),
  logout: assetUrl(logout),
  exclamation: assetUrl(exclamation),
  arrow: assetUrl(arrow),
  addPhoto: assetUrl(addPhoto),
  minus: assetUrl(minus),
  orderIcon: assetUrl(orderIcon),
  logoHomeService: assetUrl(logoHomeService),
  Frame: assetUrl(Frame)
};

export default image;
