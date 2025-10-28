import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import ReuseButton from "../../../ui/Button/ReuseButton";
// import { toast } from "sonner";
// import Loading from "../../../ui/Loading";

const CustomerResponsibilityPage = () => {
  //   const { data, isFetching } = useGetTermsQuery({});
  //   const [updateStaticContent] = useAddTermsMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  //   useEffect(() => {
  //     if (data) {
  //       setContent(data?.data?.termsCondition);
  //     }
  //   }, [data]);

  const handleOnSave = async () => {
    // const toastId = toast.loading("Updating Terms and Conditions...");

    const data = {
      termsCondition: content,
    };
    console.log(data);
    // try {
    //   const res = await updateStaticContent(data).unwrap();
    //   toast.success(res?.message, { id: toastId, duration: 2000 });
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (error: any) {
    //   toast.error(
    //     error?.data?.message || "Failed to update Terms and Conditions",
    //     {
    //       id: toastId,
    //       duration: 2000,
    //     }
    //   );
    // }
  };

  //   if (isFetching) {
  //     return (
  //       <div className="flex items-center justify-center min-h-[70vh]">
  //         <Loading />
  //       </div>
  //     );
  //   }
  return (
    <div className=" min-h-[90vh]  rounded-xl">
      <div className="bg-secondary-color w-full flex items-center p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <p className="text-2xl text-primary-color font-semibold">
          Customer Responsibilities
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className="w-full">
          <div className="">
            <JoditEditor
              ref={editor}
              value={content}
              config={{ height: 500, theme: "dark", readonly: false }}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
          <ReuseButton
            htmlType="button"
            onClick={handleOnSave}
            variant="secondary"
            className="w-full mt-4"
          >
            Save
          </ReuseButton>
        </div>
      </div>
    </div>
  );
};
export default CustomerResponsibilityPage;
