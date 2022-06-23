import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateClientId, updateClientSecret } from "../settingsSlice";
import { renewToken } from "../actions/renewToken";
import moment from "moment";

function formatToken(token?: string): string {
  if (token === undefined) return "";
  return `${token.substring(0, 4)}**********${token.substring(
    token.length - 4
  )}`;
}

function formatExpiresAt(expires_at?: number): string {
  if (expires_at === undefined) return "";
  return moment().to(moment.unix(expires_at));
}

export default function GeneralSettingsTab() {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 overflow-auto">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          UberEats Settings
        </h3>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <ClientIdSetting />
          <ClientSecretSetting />
          <AccessTokenSetting />
        </dl>
      </div>
    </div>
  );
}

function ClientIdSetting() {
  const appClientId = useAppSelector(
    (state) => state.settings.ueSettings.client_id
  );
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [settingsValue, setSettingsValue] = useState(appClientId);

  const saveSettings = useCallback(() => {
    dispatch(updateClientId(settingsValue));
    setIsEditing(false);
  }, [dispatch, settingsValue]);

  return (
    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">Client ID</dt>
      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {isEditing ? (
          <div className="flex-grow">
            <input
              value={settingsValue}
              onChange={(e) => setSettingsValue(e.target.value)}
            />
          </div>
        ) : (
          <span className="flex-grow overflow-hidden overflow-ellipsis">
            {appClientId}
          </span>
        )}
        <span className="ml-4 flex-shink-0">
          {isEditing ? (
            <button
              type="button"
              className="rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => saveSettings()}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setIsEditing(true)}
            >
              Update
            </button>
          )}
        </span>
      </dd>
    </div>
  );
}

function ClientSecretSetting() {
  const appClientSecret = useAppSelector(
    (state) => state.settings.ueSettings.client_secret
  );
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [settingsValue, setSettingsValue] = useState(appClientSecret);

  const saveSettings = useCallback(() => {
    dispatch(updateClientSecret(settingsValue));
    setIsEditing(false);
  }, [dispatch, settingsValue]);

  return (
    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">Client Secret</dt>
      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {isEditing ? (
          <div className="flex-grow">
            <input
              value={settingsValue}
              onChange={(e) => setSettingsValue(e.target.value)}
            />
          </div>
        ) : (
          <span className="flex-grow overflow-hidden overflow-ellipsis">
            {appClientSecret}
          </span>
        )}
        <span className="ml-4 flex-shink-0">
          {isEditing ? (
            <button
              type="button"
              className="rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => saveSettings()}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setIsEditing(true)}
            >
              Update
            </button>
          )}
        </span>
      </dd>
    </div>
  );
}

function AccessTokenSetting() {
  const { client_id, client_secret, token } = useAppSelector((state) => ({
    client_id: state.settings.ueSettings.client_id,
    client_secret: state.settings.ueSettings.client_secret,
    token: state.settings.ueSettings.token,
  }));
  const dispatch = useAppDispatch();

  const renewTokenCallback = useCallback(() => {
    dispatch(renewToken({ client_id, client_secret }));
  }, [dispatch, client_id, client_secret]);

  return (
    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">Access Token</dt>
      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <div className="flex-grow flex items-center">
          {token === undefined ? (
            <div className="text-xs">Not Set</div>
          ) : (
            <div className="flex flex-col">
              <span className="text-sm">
                {formatToken(token?.access_token)}
              </span>
              <span className="text-xs font-medium">
                Expires {formatExpiresAt(token?.expires_at)}
              </span>
            </div>
          )}
        </div>
        <span className="ml-4 flex-shink-0">
          <button
            type="button"
            className="rounded-md font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => renewTokenCallback()}
          >
            Renew Token
          </button>
        </span>
      </dd>
    </div>
  );
}
