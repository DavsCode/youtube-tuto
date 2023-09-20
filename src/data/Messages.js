import Img1 from "../assets/images/img1.png";
import Img2 from "../assets/images/img2.png";
import Img3 from "../assets/images/img3.png";

export const SeedMessages = [
  { id: 1, owner: false, message: "Hi!", images: [] },
  {
    id: 2,
    owner: true,
    message: "Hi! How are you doing?",
    images: [],
  },
  { id: 3, owner: false, message: "Yeah i am fine", images: [] },
  {
    id: 4,
    owner: false,
    message: "and you? i hope u also fine.",
    images: [],
  },
  {
    id: 5,
    owner: true,
    message: "some images",
    images: [Img1, Img2, Img3],
  },
  { id: 6, owner: false, message: "Cool!", images: [] },
  { id: 7, owner: false, message: "Nice!", images: [] },
  { id: 8, owner: true, message: "See you", images: [] },
  {
    id: 9,
    owner: false,
    message: "some images",
    images: [Img1, Img2, Img3],
  },
];
