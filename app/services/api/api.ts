/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce"
import { VehicleSnapshotIn, VehicleSnapshotOut } from "app/models"
import { ComponentSnapshotIn } from "app/models/Component"
import Config from "../../config"
import type { OrderServiceSnapshotIn } from "../../models/OrderService"
import type { ApiConfig } from "./api.types"
import { GeneralApiProblem } from "./apiProblem"
import { apiDatabase } from "./database/firestore"

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getVehicles(): Promise<{ kind: "ok"; vehicles: VehicleSnapshotIn[] } | GeneralApiProblem> {
    try {
      const vehicles: VehicleSnapshotIn[] = await apiDatabase.vehicles();
      console.log("🚗 vehicles", vehicles);
      return { kind: "ok", vehicles }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async createVehicle(_vehicle: VehicleSnapshotOut): Promise<{ kind: "ok"; vehicle: VehicleSnapshotIn } | GeneralApiProblem> {
    try {
      const vehicle: VehicleSnapshotIn = await apiDatabase.createVehicle(_vehicle);
      console.log("🚗 vehicle", vehicle);
      return { kind: "ok", vehicle }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getOrderServices(_vehicleGuid?: string): Promise<{ kind: "ok"; orderServices: OrderServiceSnapshotIn[] } | GeneralApiProblem> {
    try {
      const orderServices: OrderServiceSnapshotIn[] = await apiDatabase.orderServices(_vehicleGuid);
      return { kind: "ok", orderServices }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async createOrderService(_orderService: OrderServiceSnapshotIn): Promise<{ kind: "ok"; orderService: OrderServiceSnapshotIn } | GeneralApiProblem> {
    try {
      const orderService: OrderServiceSnapshotIn = await apiDatabase.createOrderService(_orderService);
      console.log("🎁 orderService", orderService);
      return { kind: "ok", orderService }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getComponents(): Promise<
    { kind: "ok"; components: ComponentSnapshotIn[] } | GeneralApiProblem
  > {
    try {
      const components: ComponentSnapshotIn[] = await apiDatabase.components();
      console.log("🎸 components", components);
      return { kind: "ok", components }
    } catch {
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
