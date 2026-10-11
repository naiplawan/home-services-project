import Tools from './tools.png';
import House from './house.svg';
import HouseIcon from './HouseIcon.svg'
import LetterIcon from './LetterIcon.svg'
import Phone from './Phone.svg'
import BlueMan from "../../assets/homepagePhoto/blueMan.png";
import Cleaning from '../../assets/homepagePhoto/Cleaning.png';
import Air from '../../assets/homepagePhoto/Air.png';
import Washing from '../../assets/homepagePhoto/Washing.png';
import SellBlack from './SellBlack.jsx';
import Paper from "../homepagePhoto/paper.svg"
import AddImage from '../../assets/homepagePhoto/addImage.svg';
import Bell from '../../assets/homepagePhoto/bell.svg';
import Exclamation from '../../assets/homepagePhoto/exclamation.svg';

const assetUrl = (asset) => (typeof asset === "string" ? asset : asset?.src);




const homepageicon = {
Tools: assetUrl(Tools),
House: assetUrl(House),
HouseIcon: assetUrl(HouseIcon),
LetterIcon: assetUrl(LetterIcon),
Phone: assetUrl(Phone),
BlueMan: assetUrl(BlueMan),
Cleaning: assetUrl(Cleaning),
Air: assetUrl(Air),
Washing: assetUrl(Washing),
SellBlack,
Paper: assetUrl(Paper),
AddImage: assetUrl(AddImage),
Bell: assetUrl(Bell),
Exclamation: assetUrl(Exclamation),

}

export default homepageicon
