const Footer = () => {
  return (
    <div className="bg-black py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className=" text-[#BF6BAD] text-3xl font-monoton font-bold tracking-tight">
          Fusion
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer hover:underline">Privacy Policy</p>
          <p className="cursor-pointer hover:underline">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
