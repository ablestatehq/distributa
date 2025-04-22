import { Button } from "./forms";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <article className="flex flex-1 flex-col items-center gap-y-4">
      <div className="flex justify-center items-center rounded-full bg-grey w-24 h-24">
        <Icon variation="black" />
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="font-archivo font-normal text-xl leading-120 tracking-normal text-center">
          {title}
        </h3>
        <p className="font-satoshi font-normal text-medium leading-150 tracking-normal text-center">
          {description}
        </p>
      </div>
      <Button
        className="w-fit px-12 py-3 font-bold text-medium"
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </article>
  );
}
