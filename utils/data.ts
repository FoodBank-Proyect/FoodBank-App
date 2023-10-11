import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require("../assets/animations/Lottie1.json"),
    text: "Alguien necesita de tu ayuda",
    textColor: "#EE4B2B",
    backgroundColor: "#ffffff",
  },
  {
    id: 2,
    animation: require("../assets//animations/Lottie2.json"),
    text: "Juntos, podemos hacer la diferencia",
    textColor: "#1e2169",
    backgroundColor: "#bae4fd",
  },
  {
    id: 3,
    animation: require("../assets//animations/Lottie3.json"),
    text: "Ayuda a un niño a tener un mejor futuro",
    textColor: "#F15937",
    backgroundColor: "#faeb8a",
  },
];

export default data;
