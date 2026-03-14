import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrencty } from "../../../../../app/utils/currency";
import { EyeIcon } from "../../../../../assets/icons/EyeIcon";
import { Spinner } from "../../../../components/Spinner";
import { AccountCard } from "./AccountCard";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { useAccountsController } from "./useAccountsController";

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10 text-teal-950/50 fill-white" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="tracking-[0.5px] text-white block">
              Saldo total
            </span>
            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  "text-2xl tracking-[-1px] text-white",
                  !areValuesVisible && "blur-md",
                )}
              >
                {formatCurrencty(1000)}
              </strong>
              <button
                className="w-8 h-8 flex items-center justify-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            <div>
              <Swiper
                spaceBetween={16}
                slidesPerView={windowWidth >= 500 ? 2.2 : 1.2}
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
        </>
      )}
    </div>
  );
}
