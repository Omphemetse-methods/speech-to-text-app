import React from "react";
import { Transition } from "@headlessui/react";

const PopUp = ({ isCopied, handleClose }) => {
  const [isShowing, setIsShowing] = React.useState(isCopied);

  return (
    <Transition
      show={isShowing}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed w-screen h-screen"
    >
      <section className="flex justify-end p-8">
        <p>Show</p>
      </section>
    </Transition>
  );
};

export default PopUp;
