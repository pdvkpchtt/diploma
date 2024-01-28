import Cross2 from "@/shared/icons/Cross2";
import Modal from "@/shared/ui/Modal";
import Link from "next/link";

const NoMoneyModal = ({ modalState = false, setModalState = () => {} }) => {
  return (
    <Modal isOpen={modalState} handleClose={() => setModalState(false)}>
      {/* header */}
      <div className="flex flex-row justify-end [@media(pointer:coarse)]:hidden relative h-fit">
        <Cross2 onClick={() => setModalState(false)} />

        {/* <div className="h-[0.5px] w-[calc(100%+24px)] bg-[#e7e7e7] dark:bg-[#2f2f2f] absolute top-[30px] left-[-12px]" /> */}
      </div>
      {/* header */}

      <div className="h-fit mt-[12px] flex flex-col [@media(pointer:coarse)]:hidden overflow-y-auto rounded-b-[20px] px-[12px] mb-[-12px] pb-[12px] gap-[34px]">
        <div className="flex flex-col [@media(pointer:coarse)]:hidden">
          <p className="text-[#2c2c2c] dark:text-white text-[16px] leading-[19px] font-medium trackin-[-0.24px]">
            Генерация тестов с помощью{" "}
            <span className="text-[#5875e8] text-[16px] leading-[19px] font-semibold trackin-[-0.24px]">
              AI
            </span>{" "}
            ограничена.
          </p>
          <p className="text-[#8f8f8f] text-[14px] leading-[19px] font-medium trackin-[-0.24px]">
            Каждый день вам начисляется 3 интеллитеста
          </p>
          <Link
            href={"/subscriptions"}
            className="bg-[#5875e8] px-[16px] py-[12px] w-fit hover:bg-[#3A56C5] cursor-pointer mt-[12px] rounded-[16px] active:bg-[#2C429C] transition duration-[250ms] text-[#fff] font-medium text-[16px] tracking-[-0.24px] leading-[19px]"
          >
            Получить больше
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default NoMoneyModal;
