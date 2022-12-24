import { LockClosedIcon } from "@heroicons/react/solid";
import Button from "../../components/form/Button";
import _ from "lodash";
import { Spinner } from "flowbite-react";
import Text from "../../components/Text";
import { useNavigate } from "react-router-dom";
import EmailFormik from "../../components/formik/EmailFormik";
import PasswordFormik from "../../components/formik/PasswordFormik";

export type FormLoginProps = {
  loading?: boolean;
};

export default function Form(props: FormLoginProps) {
  const nav = useNavigate();
  return (
    <>
      <EmailFormik
        source="email"
        label={false}
        withIcon={true}
        required={true}
      />
      <PasswordFormik
        source="password"
        label={false}
        required={true}
        withIcon={true}
      />
      <Text
        label="Don't have account?"
        className="text-indigo-500 font-medium text-sm cursor-pointer"
        onClick={() => nav("/auth/register")}
      />
      <Button
        type="submit"
        icon={
          <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
        }
        positionIcon="left"
        label={props.loading ? <Spinner color="gray" /> : "Login"}
      />
    </>
  );
}
