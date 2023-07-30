import React, { useEffect } from "react";
import { Footer, WishlistCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "./wishlistAction";

const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.wishlistStore);

  useEffect(() => {
    !wishlist.length && dispatch(fetchWishlist());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bg-[#FDF9FF] min-h-[calc(100vh-70px)] px-3">
        <section className="max-w-screen-xl mx-auto">
          <div className="px-2 py-8">
            <h1 className="text-[#2c3c3c] text-xl font-semibold">Wishlist</h1>
          </div>
          <div className="pb-40">
            <div className="max-w-[930px] mx-auto bg-white rounded-xl p-4 lg:p-8">
              {wishlist.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <label className="text-lg md:text-2xl text-[#ADADAD]">
                    Wishlist is empty
                  </label>
                </div>
              ) : (
                <>
                  {wishlist.map((item) => {
                    return (
                      <WishlistCard
                        key={item._id}
                        _id={item._id}
                        image={item.image}
                        title={item.name}
                        price={item.price}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
