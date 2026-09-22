import Image, { type ImageProps } from "next/image";

type BrandImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  cutout?: boolean;
  backdropClassName?: string;
};

/** รูปโลโก้/ตัวละคร — blend ตัดพื้นหลังดำของ PNG */
export function BrandImage({
  cutout = true,
  className = "",
  backdropClassName = "bg-[#fff8fb]",
  fill,
  ...props
}: BrandImageProps) {
  const src =
    typeof props.src === "string"
      ? props.src
          .replace("character-pukpik.png", "character-pukpik-cutout.png")
          .replace("logo-pukpik.png", "logo-pukpik-cutout.png")
      : props.src;

  if (!cutout) {
    return <Image {...props} src={src} fill={fill} className={className} alt={props.alt} />;
  }

  const wrapperClass = fill
    ? `relative block h-full w-full overflow-hidden ${backdropClassName}`
    : `inline-block leading-none ${backdropClassName}`;

  return (
    <span className={wrapperClass}>
      <Image {...props} src={src} fill={fill} alt={props.alt} className={className} />
    </span>
  );
}
