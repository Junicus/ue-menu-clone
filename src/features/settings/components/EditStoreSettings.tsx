import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateStore } from "../settingsSlice";

function useLocationState<T = unknown>() {
  const { state } = useLocation();
  return state as T;
}

type FormData = {
  storeId: string;
  conceptId: string;
  name: string;
  uberId: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function EditStoreSettings() {
  const { conceptId, storeId } = useLocationState<{
    conceptId: string;
    storeId: string;
  }>();
  console.log(conceptId, storeId);
  const store = useAppSelector(
    (state) => state.settings.concepts[conceptId].stores[storeId]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      conceptId,
      storeId,
      name: store.name,
      uberId: store.uberId,
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    navigate(`../concept/${conceptId}`, { replace: true });
    dispatch(updateStore({ ...data }));
  };

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="mt-5 flex">
        <h3 className="text-lg font-medium leading-6 texzt-gray-900">
          Edit Store: {}
        </h3>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("conceptId")} />
          <input type="hidden" {...register("storeId")} />
          <div className="space-y-8 sm:space-y-5 divide-y divide-gray-200">
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
