"use client";

import { useEffect, useMemo, useState } from "react";
import {
  InputBase
} from "~~/components/scaffold-stark";
import { BanknotesIcon } from "@heroicons/react/24/outline";

export const SubmitProject = () => {
  const [loading, setLoading] = useState(false);
  const [sendValue, setSendValue] = useState("");

  return (
    <div className="flex flex-col space-y-3 mt-5">
      <label
        htmlFor="submit-project-modal"
        className="flex btn btn-primary btn-lx font-normal"
      >
        <span>Submit a Project</span>
      </label>
      <input type="checkbox" id="submit-project-modal" className="modal-toggle" />
      <label htmlFor="submit-project-modal" className="modal cursor-pointer">
        <label className="modal-box relative">
          {/* dummy input to capture event onclick on modal box */}
          <input className="h-0 w-0 absolute top-0 left-0" />
          <h3 className="text-xl font-bold mb-3">Submit a Project</h3>
          <label
            htmlFor="submit-project-modal"
            className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
          >
            ✕
          </label>
          <div className="space-y-3">
            <div className="flex flex-col space-y-3 mb-3">
              <InputBase
                placeholder="Project name"
                value={sendValue}
                onChange={(value) => setSendValue(value)}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <button
              className="h-10 btn btn-primary btn-sm px-2 rounded-full"
            >
              {loading &&
                (<span className="loading loading-spinner loading-sm"></span>)
              }
              <span>Submit</span>
            </button>
          </div>
        </label>
      </label>
    </div>
  );
};
