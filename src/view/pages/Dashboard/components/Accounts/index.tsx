import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import { EyeIcon } from "../../../../../assets/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { useAccountsController } from "./useAccountsController";

export function Accounts() {
  const { sliderState, setSliderState } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      <div>
        <span className="tracking-[0.5px] text-white block">Saldo total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 1000,00
          </strong>
          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={2.1}
            onSlideChange={(swiper) => {
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
              });
            }}
          >
            <div
              className="flex items-center justify-between mb-4"
              slot="container-start"
            >
              <strong className="text-white tracking-[-1px] text-lg font-bold">
                Minhas contas
              </strong>
              <AccountsSliderNavigation
                isBeginning={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
            </div>
            <SwiperSlide>
              <AccountCard
                color="#7950F2"
                name="NuBank"
                balance={100.55}
                type="INVESTMENT"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                color="#333"
                name="XP"
                balance={30395.89}
                type="INVESTMENT"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                color="#0F0"
                name="Carteira"
                balance={1000}
                type="CASH"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
