import SlickSlider, { type Settings } from "react-slick";
import type { ComponentType, ReactNode } from "react";

type SliderProps = Settings & {
  children?: ReactNode;
};

type SliderComponent = ComponentType<SliderProps>;

type SliderModule =
  | SliderComponent
  | {
    default: SliderComponent;
  };

const SliderImport = SlickSlider as SliderModule;

const Slider: SliderComponent =
  "default" in SliderImport ? SliderImport.default : SliderImport;

export default Slider;