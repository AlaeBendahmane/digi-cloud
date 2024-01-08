import { useProvider } from "../provider";

interface ClosePopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClose?: () => void;
}

function ClosePopover(props: ClosePopoverProps) {
  const context = useProvider();
  return (
    <span
      onClick={() => {
        props.onClose?.();
        context.popover.setOpen(false);
      }}
      {...props}
    >
      {props.children}
    </span>
  );
}

export default ClosePopover;
