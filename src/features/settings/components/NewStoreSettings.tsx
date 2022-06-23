import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../app/hooks";
import { addStore } from "../settingsSlice";

function useLocationState<T = unknown>() {
  const { state } = useLocation();
  return state as T;
}

type FormData = {
  id: string;
  conceptId: string;
  name: string;
  uberId: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NewStoreSettings() {
  const location = useLocation();
  console.log(location.pathname);
  const state = useLocationState<{ conceptId: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { conceptId: state.conceptId } });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log(data);

    navigate(`../concept/${state.conceptId}`, { replace: true });
    dispatch(addStore({ ...data }));
  };

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="mt-5 flex">
        <h3 className="text-lg font-medium leading-6 texzt-gray-900">
          New Store
        </h3>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("conceptId")} />
          <div className="space-y-8 sm:space-y-5 divide-y divide-gray-200">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <label>Store ID</label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  {...register("id", { required: true })}
                  className={classNames(
                    "flex-1 block w-full min-w-0 rounded-md sm:text-sm border-gray-300",
                    errors.id
                      ? "focus:border-red-500 focus:ring-red-500"
                      : "focus:border-indigo-500 focus:ring-indigo-500"
                  )}
                />
                {errors.id && (
                  <span className="mt-2 text-sm text-red-600">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <label>Store Name</label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className={classNames(
                    "flex-1 block w-full min-w-0 rounded-md sm:text-sm border-gray-300",
                    errors.name
                      ? "focus:border-red-500 focus:ring-red-500"
                      : "focus:border-indigo-500 focus:ring-indigo-500"
                  )}
                />
                {errors.name && (
                  <span className="mt-2 text-sm text-red-600">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <label>Store Uber Id</label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  {...register("uberId", { required: true })}
                  className={classNames(
                    "flex-1 block w-full min-w-0 rounded-md sm:text-sm border-gray-300",
                    errors.uberId
                      ? "focus:border-red-500 focus:ring-red-500"
                      : "focus:border-indigo-500 focus:ring-indigo-500"
                  )}
                />{" "}
                {errors.uberId && (
                  <span className="mt-2 text-sm text-red-600">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="pt-5">
              <div className="flex justify-end">
                <Link
                  to="/settings/concepts"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="ml-3 py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
