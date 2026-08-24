import React from "react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-slate-500">Notes</p>
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          {subtitle ? <p className="mt-2 text-sm text-slate-600">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;