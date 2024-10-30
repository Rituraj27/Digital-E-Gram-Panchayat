import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Slider = ({ image1, image2, image3, image4, image5, image6 }) => {
  return (
    <div className="overflow-hidden">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem>
            <img src={image1} alt="" className="w-full h-[25vw]"/>
          </CarouselItem>
          <CarouselItem>
            <img src={image2} alt="" className="w-full h-[25vw]"/>
          </CarouselItem>
          <CarouselItem>
            <img src={image3} alt="" className="w-full h-[25vw]"/>
          </CarouselItem>
          <CarouselItem>
            <img src={image4} alt="" className="w-full h-[25vw]"/>
          </CarouselItem>
          <CarouselItem>
            <img src={image5} alt="" className="w-full h-[25vw]"/>
          </CarouselItem>
          <CarouselItem>
            <img src={image6} alt="" className="w-full h-[25vw]"/>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Slider;
