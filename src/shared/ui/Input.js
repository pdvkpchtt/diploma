"use client";

import { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import SearchInputIcon from "../icons/SearchInputIcon";

import TextSecondary from "../Text/TextSecondary";

export const Input = ({
  label = "",
  caption = "",
  placeholder = "",
  value,
  error = false,
  rounded = 8,
  maxLength,
  onChange,
  type = "text",
  name = "",
  defaultValue,
}) => {
  return (
    <div className="flex flex-col min-w-[20px] w-full">
      {label && (
        <TextSecondary
          text={label}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
      )}

      <input
        name={name}
        placeholder={placeholder || ""}
        value={value ? value : ""}
        autoComplete
        className={`px-[12px] h-[42px] ${
          error
            ? "text-red-500 dark:text-red-500"
            : "text-[#2c2c2c] dark:text-white"
        } text-[14px] pb-[12px] bg-[#f6f6f8] dark:bg-[#2c2c2c] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]`}
        style={{
          borderRadius: rounded,
        }}
        onChange={onChange ? (e) => onChange(e.target.value) : null}
        type={type}
        maxLength={maxLength}
        defaultValue={defaultValue ? defaultValue : null}
      />

      {caption && (
        <p className="text-[13px] leading-[16px] tracking-[-0.351px] mt-[3px] text-[#F0BB31]">
          {caption}
        </p>
      )}
    </div>
  );
};

export const TextArea = ({
  label,
  caption,
  style = "",
  defaultValue,
  placeholder = "",
  value,
  minRows,
  maxRows,
  rounded = 8,
  onChange,
  maxLength,
}) => {
  return (
    <div className={`flex flex-col ${style}`}>
      {label && (
        <TextSecondary
          text={label}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
      )}

      <TextareaAutosize
        onChange={onChange ? (e) => onChange(e.target.value) : null}
        placeholder={placeholder || ""}
        defaultValue={defaultValue ? defaultValue : null}
        className="hover:inner-border-[1px] bg-[#f6f6f8] dark:bg-[#2c2c2c] dark:placeholder:text-[#8f8f8f] dark:text-white transition duration-[250ms] hover:inner-border-[#5875e8] placeholder:font-normal placeholder:text-[#bfbfbf] placeholder:leading-[18px] placeholder:tracking-[-0.015em]"
        style={{
          whiteSpace: "pre-line",
          resize: "none",
          padding: 12,
          borderRadius: rounded,
          outline: "none",
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "18px",
          letterSpacing: "-0.015em",
        }}
        value={value ? value : ""}
        maxLength={maxLength}
        maxRows={maxRows && maxRows}
        minRows={minRows && minRows}
      />

      {caption && (
        <p className="text-[13px] leading-[16px] tracking-[-0.351px] mt-[3px] text-[#F0BB31]">
          {caption}
        </p>
      )}
    </div>
  );
};

export const SearchInput = ({
  placeholder = "",
  value,
  onChange = () => {},
}) => {
  const ref = useRef(null); // чтобы при нажатии на весь иблок инпута происходила фокусировка

  return (
    <div
      className="[@media(pointer:coarse)]:rounded-[20px] bg-[#f6f6f8] dark:bg-[#2c2c2c] dark:placeholder:text-[#8f8f8f] dark:text-white px-[12px] rounded-[8px] w-full cursor-text flex items-center flex-row gap-[8px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8]"
      onClick={() => ref.current.focus()}
    >
      <div className="[@media(pointer:coarse)]:hidden">
        <SearchInputIcon />
      </div>

      <input
        ref={ref}
        placeholder={placeholder || ""}
        value={value}
        className="placeholder:font-normal h-[42px] w-full text-[#2c2c2c] dark:placeholder:text-[#8f8f8f] dark:text-white bg-transparent pt-[11px] pb-[11px] outline-none placeholder:text-[#bfbfbf] leading-[16.8px] tracking-[-0.013em] placeholder:leading-[16.8px] placeholder:tracking-[-0.013em]"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
