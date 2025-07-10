import placeholder from "@/assets/image/600x400.png";
import { cn } from "@/lib/utils";

interface TextImageDuoProps {
  children: React.ReactNode;
  image?: { src: string; alt?: string };
  imgFirst?: boolean;
}

export default function TextImageDuo({ children, image, imgFirst = false }: TextImageDuoProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-x-48 gap-y-8 lg:flex-row">
      <div
        className={cn(
          "order-2 flex w-full flex-1 flex-col gap-y-6",
          imgFirst ? "lg:order-2" : "lg:order-1",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "order-1 flex w-full flex-1 items-center justify-center",
          imgFirst ? "lg:order-1" : "lg:order-2",
        )}
      >
        <img
          width={600}
          height={400}
          src={image?.src ?? placeholder}
          alt={image?.alt ?? "Image missing alt :( - please email us about this issue"}
          className="h-auto w-full rounded-2xl"
        />
      </div>
    </div>
  );
}
