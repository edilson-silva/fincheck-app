import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrencty } from "../../../../../app/utils/currency";
import { formatDate } from "../../../../../app/utils/date";
import { TransactionCategoryType } from "../../../../../app/utils/types";
import { CategoryIcon } from "../../../../../assets/icons/categories/CategoryIcon";
import { FilterIcon } from "../../../../../assets/icons/FilterIcon";
import emptyStateImage from "../../../../../assets/images/empty-state.svg";
import { Spinner } from "../../../../components/Spinner";
import { FiltersModal } from "./FiltersModal";
import { SliderNavigation } from "./SliderNavigation";
import { SliderOption } from "./SliderOption";
import { TransactionsMenu } from "./TransactionsMenu";
import { useTransactionsController } from "./useTransactionsController";

export function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filters,
    handleChangeFilter,
    handleChangeFilters,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-200 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleChangeFilters}
          />
          <header className="">
            <div className="flex items-center justify-between">
              <TransactionsMenu
                onSelect={(transactionType) => {
                  handleChangeFilter("transactionType", transactionType);
                }}
                selectedType={filters.transactionType}
              />
              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>
            <div className="mt-5 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={(swiper) => {
                  handleChangeFilter("month", swiper.realIndex);
                }}
              >
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>
          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <img src={emptyStateImage} alt="Empty State" />
                <span className="text-gray-700">
                  Não encontramos nenhuma transação
                </span>
              </div>
            )}

            {hasTransactions &&
              !isLoading &&
              transactions.map((transaction) => {
                const isExpense =
                  transaction.type === TransactionCategoryType.EXPENSE;
                return (
                  <div
                    key={transaction.id}
                    className="bg-white p-4 rounded-2xl flex items-center jusitfy-between gap-4"
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon
                        type={transaction.type}
                        category={transaction.category?.icon}
                      />
                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "tracking-[-0.5px] font-medium",
                        isExpense ? "text-red-800" : "text-green-800",
                        !areValuesVisible && "blur-sm",
                      )}
                    >
                      {isExpense ? "-" : "+"}
                      {formatCurrencty(transaction.value)}
                    </span>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
