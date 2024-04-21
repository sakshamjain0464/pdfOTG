
function GoogleButton() {
  return (
<div className=" mt-3 flex items-center w-full justify-center h-fit">
    <button className="px-4 w-full flex justify-center py-2 border gap-2 border-slate-200 dark:border-primary rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        <span>Continue with Google</span>
    </button>
</div>
  )
}

export default GoogleButton
