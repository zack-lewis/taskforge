"use client";
import { FormType } from "@/lib/otherTypes";
import { Button } from "./ui/button";
import { UserForm } from "@/app/(app)/admin/users/_components/userForm";
import { useState } from "react";
import Image from "next/image";
import { team } from "@prisma/client";

export default function NewButton({
  formType,
  teams,
}: {
  formType: FormType;
  teams: team[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [border, setBorder] = useState("border-black border-2");
  const modalVis = modalOpen ? "block" : "hidden";

  function handleNewBtnClick() {
    setModalOpen(!modalOpen);
  }

  function flashBox() {
    setBorder("border-red-500 border-2 animate-pulse");
    setTimeout(() => setBorder("border-black border-1"), 2000);
  }

  const selectedForm = () => {
    switch (formType) {
      case FormType.User:
        return <UserForm teamList={teams} />;
      default:
        break;
    }
  };

  return (
    <>
      <div className="w-full h-10 ">
        <Button onClick={handleNewBtnClick}>New</Button>
      </div>
      <div
        className={`z-10 w-full h-full absolute top-0 left-0 ${modalVis}`}
        onClick={flashBox}
      >
        <div
          className={`z-50 w-full md:w-1/3 h-full md:h-3/5 m-auto p-4 bg-accent absolute top-1/4 left-1/3 flex flex-col border border-spacing-2 rounded-2xl ${border}`}
        >
          <div className="float-right top-1 right-1 w-10 h-10 mr-0 ml-auto">
            <Button onClick={handleNewBtnClick}>
              <Image
                alt="Close Form"
                src="/closeBtn.svg"
                width={100}
                height={100}
              />
            </Button>
          </div>
          <div>{selectedForm()}</div>
        </div>
      </div>
    </>
  );
}
