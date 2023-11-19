import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storeType } from "../../store";
import { getAddress } from "../../services/apiGeocoding";

export interface initialStateType {
  name: string;
  status: string;
  address: string;
  position: { latitude: number; longitude: number } | object;
  error: string;
}

// thunk for location data:
function getLatAndLong() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress: any = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    const positionObj: any = await getLatAndLong();
    const position = {
      latitude: positionObj?.coords.longitude,
      longitude: positionObj?.coords.longitude,
    };
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  }
);

const initialState: initialStateType = {
  name: "AbduLLah",
  status: "idle",
  address: "",
  position: {},
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.address = action.payload.address;
        state.position = action.payload.position;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "An error occured while fetching address, Please fill the address field !";
      }),
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;

export const getUsername = (state: storeType) => state.user.name;
export const getUserAddress = (state: storeType) => state.user.address;
export const getLoadingAddressStatus = (state: storeType) => state.user.status;
export const getAddressError = (state: storeType) => state.user.error;
