import AiIcon from "@/shared/icons/AiIcon";
import Cross2 from "@/shared/icons/Cross2";
import TextMain from "@/shared/Text/TextMain";
import TextSecondary from "@/shared/Text/TextSecondary";
import Modal from "@/shared/ui/Modal";
import Link from "next/link";

const PremiumModal = ({ modalState = false, setModalState = () => {} }) => {
  return (
    <>
      <Modal isOpen={modalState} handleClose={() => setModalState(false)}>
        {/* header */}
        <div className="flex flex-row justify-end [@media(pointer:coarse)]:hidden relative h-fit">
          <Cross2 onClick={() => setModalState(false)} />

          {/* <div className="h-[0.5px] w-[calc(100%+24px)] bg-[#e7e7e7] dark:bg-[#2f2f2f] absolute top-[30px] left-[-12px]" /> */}
        </div>
        {/* header */}

        <div className="h-fit mt-[12px] flex flex-col [@media(pointer:coarse)]:hidden overflow-y-auto rounded-b-[20px] px-[12px] mb-[-12px] pb-[12px] gap-[34px]">
          <div className="flex flex-col [@media(pointer:coarse)]:hidden">
            <div className="flex flex-row gap-[4px] items-center">
              <AiIcon black blue={false} />

              <TextMain
                text="Интеллитест"
                style={
                  "text-[20px] font-medium leading-[22px] tracking-[-0.4px]"
                }
              />
            </div>
            <TextMain
              text="Генерация теста для проверки навыков соискателя с помощью AI"
              style={
                "text-[16px] font-normal leading-[19px] tracking-[-0.24px] mt-[16px] mb-[4px]"
              }
            />
            <TextSecondary
              text="— каждый день вам начисляется 3 бесплатных интеллитеста"
              style={
                "text-[16px] font-normal leading-[19px] tracking-[-0.24px]"
              }
            />
            <TextSecondary
              text="— для увеличения лимита можно приобрести план"
              style={
                "text-[16px] font-normal leading-[19px] tracking-[-0.24px]"
              }
            />
          </div>
          <Link
            href={"/subscriptions"}
            className="text-[#5875e8] hover:text-[#3A56C5] cursor-pointer mb-[15px] active:text-[#2C429C] transition duration-[250ms] font-normal text-[16px] tracking-[-0.24px] leading-[19px]"
          >
            Как получить больше?
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default PremiumModal;
