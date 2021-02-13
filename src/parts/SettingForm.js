import React, { useState } from "react";

import { ReactComponent as DefaultUser } from "assets/images/default-avatar.svg";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import useForm from "helpers/hooks/useForm";
import image2base64 from "utils/image2base64";
import { Input } from "components/form/input";
import { Select } from "components/form/select";
import fieldsErrors from "helpers/fieldsErrors";
import { useEffect } from "react";
import media from "constants/api/media";
import users from "constants/api/users";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { populateProfile } from "store/actions/users";
import { withRouter } from "react-router-dom";

const SettingForm = ({ data }) => {
    const dispatch = useDispatch();

    const [state, setKey, setState] = useForm({
        name: data?.name ?? "",
        email: data?.email ?? "",
        password: data?.password ?? "",
        profession: data?.profession ?? "",
        otherProfession: data?.otherProfession ?? "",
    });

    useEffect(() => {
        setState({
            ...state,
            ...data,
            profession: data?.profession ? data.profession : "",
        });
    }, [data]);

    const [Errors, setErrors] = useState(() => null);

    const addPicture = useRef(null);

    const previewImage = (e) => {
        e.persist();
        image2base64(e.target.files[0]).then((image) => {
            setKey({
                target: {
                    name: e.target.name,
                    value: image,
                },
            });
        });
    };

    const submit = async (e) => {
        e.preventDefault();

        const payload = {
            name: state.name,
            email: state.email,
            password: state.password,
            profession:
                state.profession === "Others"
                    ? state.otherProfession
                    : state.profession,
        };

        if (state?.avatar?.indexOf("base64") > -1) {
            const avatar = await media.upload(state.avatar);
            payload.avatar = avatar.data.image;
        }

        users
            .update(payload)
            .then((res) => {
                toast.success("Profile Updated");
                setState({
                    ...state,
                    password: "",
                });
                setErrors(null);
                dispatch(
                    populateProfile({
                        ...data,
                        ...res.data,
                    })
                );
            })
            .catch((err) => {
                setErrors(err?.response?.data?.message ?? "error");
            });
    };
    const ERRORS = fieldsErrors(Errors);

    return (
        <>
            <section className="flex flex-col mt-8">
                <div className="flex justify-start items-center -mx-5">
                    <div className="w-auto text-center px-5">
                        <div className="rounded-full overflow-hidden w-24 h-24">
                            {state.avatar ? (
                                <img
                                    className="object-cover w-full h-full"
                                    alt="preview"
                                    src={state.avatar}
                                ></img>
                            ) : (
                                <DefaultUser
                                    className="fill-indigio-500"
                                    style={{ width: 90, height: 90 }}
                                ></DefaultUser>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <span className="text-gray-600">
                            Add your picture...
                        </span>
                        <div>
                            <input
                                type="file"
                                className="hidden"
                                name="avatar"
                                ref={addPicture}
                                onChange={previewImage}
                            />
                            <button
                                onClick={() => addPicture.current.click()}
                                className="bg-gray-500 hover:bg-gray-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 "
                            >
                                Browse
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col mt-8">
                <div className="flex items-center pb-24">
                    <div className="w-4/12">
                        <form onSubmit={submit}>
                            <Input
                                errors={ERRORS?.name?.message}
                                inputType="text"
                                labelName="Full Name"
                                name="name"
                                placeholder="Your name"
                                onChange={setKey}
                                value={state.name}
                            ></Input>

                            <Input
                                errors={ERRORS?.email?.message}
                                inputType="email"
                                labelName="Email Address"
                                name="email"
                                placeholder="Your Email Address"
                                onChange={setKey}
                                value={state.email}
                            ></Input>

                            <Input
                                errors={ERRORS?.password?.message}
                                inputType="password"
                                labelName="Password"
                                name="password"
                                placeholder="Your Password"
                                onChange={setKey}
                                value={state.password}
                            ></Input>

                            <div className="flex flex-col mb-4">
                                <Select
                                    labelName="Occupation"
                                    name="profession"
                                    value={state.profession}
                                    fallBackText="Select your focus"
                                    onClick={setKey}
                                >
                                    <option value={state.profession ?? ""}>
                                        {state.profession ??
                                            "Select your focus"}
                                    </option>
                                    <option value="Web Designer">
                                        Web Designer
                                    </option>
                                    <option value="Front End Developer">
                                        Front End Developer
                                    </option>
                                    <option value="Back End Developer">
                                        Back End Developer
                                    </option>
                                    <option value="Others">Others</option>
                                </Select>
                            </div>

                            {state.profession === "Others" && (
                                <Input
                                    errors={ERRORS?.otherProfession?.message}
                                    inputType="text"
                                    labelName="Other's Occupation"
                                    name="otherProfession"
                                    placeholder=" Other's Occupation"
                                    onChange={setKey}
                                    value={state.otherProfession}
                                ></Input>
                            )}
                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 "
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default withRouter(SettingForm);
