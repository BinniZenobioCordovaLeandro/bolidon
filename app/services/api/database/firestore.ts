import { createOfferModel, createUserModel, createVehicleModel, OfferSnapshotIn, UserSnapshotIn, UserSnapshotOut, VehicleSnapshotIn, VehicleSnapshotOut } from "@/models";
import { ComponentSnapshotIn } from "@/models/Component";
import { createOrderServiceModel, OrderServiceSnapshotIn } from "@/models/OrderService";
import { getDocs, getFirestore } from "@react-native-firebase/firestore";

export const database = getFirestore();

export const apiDatabase = {
  user: async (email: string): Promise<UserSnapshotIn | undefined> => {
    const collection =  database.collection("users");
    const query = collection.where("email", "==", email);
    const doc = await getDocs(query);
    if (doc.size === 0) return undefined;
    const data = doc.docs[0].data();
    const user = {
      guid: doc.docs[0].id,
      ...data
    };
    await doc.docs[0].ref.update({ lastLogin: new Date() });
    return user;
  },
  createUser: async (user: UserSnapshotOut): Promise<UserSnapshotIn | undefined> => {
    try {
      console.log("🚗 createUser", user);
      const collection =  database.collection("users");
      const documentRef = await collection.add(user);
      const doc = await documentRef.get();
      return createUserModel({
        guid: doc.id,
        ...doc.data()
      });
      
    } catch (error) {
      console.error("🚗 createUser", error);
      return undefined;
    }
  },
  updateUser: async (user: UserSnapshotOut): Promise<UserSnapshotIn> => {
    const collection =  database.collection("users");
    const documentRef = collection.doc(user.guid);
    await documentRef.update(user);
    const doc = await documentRef.get();
    return createUserModel({
      guid: doc.id,
      ...doc.data()
    });
  },
  vehicles: async (): Promise<VehicleSnapshotIn[]> => {
    const collection =  database.collection("vehicles");
    const docs = await getDocs(collection);
    const data: VehicleSnapshotIn[] = [];
    docs.forEach(doc => {
      data.push(
        createVehicleModel({
          guid: doc.id,
          ...doc.data()
        }),
      );
    });
    console.log("🚗 vehicles", data);
    return data;
  },
  createVehicle: async (vehicle: VehicleSnapshotOut): Promise<VehicleSnapshotIn> => {
    const collection =  database.collection("vehicles");
    const documentRef = await collection.add(vehicle);
    const doc = await documentRef.get();
    return createVehicleModel({
      guid: doc.id,
      ...doc.data()
    });
  },
  components: async (): Promise<ComponentSnapshotIn[]> => {
    const collection =  database.collection("components");
    const docs = await getDocs(collection);
    const data: ComponentSnapshotIn[] = [];
    docs.forEach(doc => {
      data.push(doc.data() as ComponentSnapshotIn);
    });
    console.log("🚗 components", data)
    return data;
  },
  orderServices: async (_vehicleGuid?: string): Promise<OrderServiceSnapshotIn[]> => {
    const collection =  database.collection("orderServices");
    const docs = await getDocs(collection);
    const data: OrderServiceSnapshotIn[] = [];
    docs.forEach(doc => {
      const docData = doc.data();
      data.push(createOrderServiceModel({
        guid: doc.id,
        kilometers: docData.kilometers,
        price: docData.price,
        pubDate: docData.pubDate,
        title: docData.title,
        description: docData.description,
        components: docData.components,
        photos: docData.photos,
        // estimatedDueDate: docData.estimatedDueDate,
      }));
    });
    console.log("🚗 orderServices", data)
    return data;
  },
  createOrderService: async (orderService: OrderServiceSnapshotIn): Promise<OrderServiceSnapshotIn> => {
    try {
      const collection =  database.collection("orderServices");
      const documentRef = await collection.add(orderService);
      const doc = await documentRef.get();
      const docData = doc.data();
      return createOrderServiceModel({
        guid: doc.id,
        kilometers: docData?.kilometers,
        price: docData?.price,
        pubDate: Date.parse(docData?.pubDate),
        title: docData?.title,
        description: docData?.description,
        components: docData?.components.map((item: any) => {
          return ({
            guid: item.guid ?? 0,
            ...item
          })
        }),
      });
    } catch (error) {
      console.error("🚗 createOrderService", error);
      return {} as OrderServiceSnapshotIn;
    }
  },
  offers: async (): Promise<OfferSnapshotIn[]> => {
    const collection =  database.collection("offers");
    const docs = await getDocs(collection);
    const data: OfferSnapshotIn[] = [];
    docs.forEach(doc => {
      const docData = doc.data();
      data.push(createOfferModel({
        guid: doc.id,
        title: docData.title,
        description: docData.description,
        price: docData.price,
      }));
    });
    console.log("🚗 offers", data)
    return data;
  },
  createOffer: async (offer: OfferSnapshotIn): Promise<OfferSnapshotIn> => {
    try {
      const collection =  database.collection("offers");
      const documentRef = await collection.add(offer);
      const doc = await documentRef.get();
      const docData = doc.data();
      return createOfferModel({
        guid: doc.id,
        title: docData?.title,
        description: docData?.description,
        price: docData?.price,
      });
    } catch (error) {
      console.error("🚗 createOffer", error);
      return {} as OfferSnapshotIn;
    }
  },
}