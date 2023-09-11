import React from "react";
import "./CreateMemorial.css";
import greater from "../../../assets/icons/greater.svg";
import LovedOne from "../../components/lovedone/LovedOne";
// import MemoLogin from "../../components/creatememo_chooseplane/ChoosePlane";
import ChoosePlane from "../../components/creatememo_chooseplane/ChoosePlane";
import MemoLogin from "../../components/creatememo_login/MemoLogin";
import PrivacyOption from "../../components/privacyoption/PrivacyOption";
import { useUserContext } from "../../../context/MemorialContext";

function CreateMemorial() {
  const { user, options, setOptions, handleSelected, showOption } =
    useUserContext();


  React.useEffect(()=>{},[user])
  // const [options, setOptions] = React.useState( [
  //   {
  //     title: "About your loved one",
  //     isCompleted: true,
  //     isActive: true,
  //     show:true,
  //     component: <LovedOne /> || "",
  //   },
  //   {
  //     title: "Account details",
  //     isCompleted: false,
  //     isActive: false,
  //     show:!user,
  //     component: <MemoLogin />,
  //   },
  //   {
  //     title: "Choose your plan",
  //     isCompleted: false,
  //     isActive: false,
  //     show:user?.meta.hasPaid?false: true || true,
  //     component: <ChoosePlane />,
  //   },
  //   {
  //     title: "Privacy options",
  //     isCompleted: false,
  //     isActive: false,
  //     show:true,
  //     component: <PrivacyOption />,
  //   },
  // ])

  // const [showOption, setShowOption] = React.useState({
  //   title: "About your loved one",
  //   isCompleted: true,
  //   isActive: true,
  //   component: <LovedOne />,
  // });

  // const handleSelected = (itm) => {
  //   const newArr = options.map((option) => {
  //     if (option === itm) {
  //       return {
  //         ...option,
  //         isActive: true,
  //       };
  //     } else {
  //       return {
  //         ...option,
  //         isActive: false,
  //       };
  //     }
  //   });
  //   setOptions(newArr)
  //   setShowOption({...itm,isActive:true});
  //   console.log(showOption);
  //   console.log(options);
  // };

  React.useEffect(() => {
    setOptions([
      {
        title: "About your loved one",
        isCompleted: true,
        isActive: true,
        show: true,
        component: <LovedOne title="About your loved one" /> || "",
      },
      {
        title: "Account details",
        isCompleted: false,
        isActive: false,
        show: !user,
        component: <MemoLogin title="Account details" />,
      },
      {
        title: "Choose your plan",
        isCompleted: false,
        isActive: false,
        show: user?.meta.hasPaid ? false : true || true,
        component: <ChoosePlane title="Choose your plan" />,
      },
      {
        title: "Privacy options",
        isCompleted: false,
        isActive: false,
        show: true,
        component: <PrivacyOption title="Privacy options" />,
      },
    ]);
  }, []);

 
  return (
    <div className="memrialpage">
      <h1>Create a memorial website</h1>
      <div className="breadcrum">
        {options.map((item) => {
          return (
            <>
              {item.show && (
                <p
                  className={`${item.isActive == true ? "active" : "noActive"}`}
                  onClick={() => handleSelected(item)}
                >
                  {item.title}

                  <span>
                    <img src={greater} />
                  </span>
                </p>
              )}
            </>
          );
        })}
      </div>
      <div className="breadcrum_component">{showOption.component}</div>
    </div>
  );
}

export default CreateMemorial;
