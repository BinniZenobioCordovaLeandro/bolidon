/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { VehicleSnapshotIn, VehicleSnapshotOut } from "app/models"
import { ComponentSnapshotIn } from "app/models/Component"
import Config from "../../config"
import type { OrderServiceSnapshotIn } from "../../models/OrderService"
import type { ApiConfig, ApiFeedResponse } from "./api.types"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import componentsMock from "./mocks/components.json"
import orderServicesMock from "./mocks/orderServices.json"
import vehiclesMock from "./mocks/vehicles.json"


/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
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
      const vehicles: VehicleSnapshotIn[] = vehiclesMock as VehicleSnapshotIn[];

      console.log("🚗 vehicles", vehicles);

      return { kind: "ok", vehicles }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async registerVehicle(_vehicle: VehicleSnapshotOut): Promise<{ kind: "ok"; vehicle: VehicleSnapshotIn } | GeneralApiProblem> {
    try {
      const vehicle: VehicleSnapshotIn = _vehicle as VehicleSnapshotIn;

      console.log("🚗 vehicle", vehicle);

      return { kind: "ok", vehicle }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async getOrderServices(vehicleGuid?: string): Promise<{ kind: "ok"; orderServices: OrderServiceSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = {
      ok: true,
      data: orderServicesMock as unknown as ApiFeedResponse,
      status: 200,
      problem: null,
      originalError: null,
    }

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = vehicleGuid ? orderServicesMock.filter((orderService) => orderService.vehicleGuid === vehicleGuid) : orderServicesMock

      // This is where we transform the data into the shape we expect for our MST model.
      const orderServices: OrderServiceSnapshotIn[] =
        rawData?.map((raw) => ({
          ...raw,
        })) ?? []

      return { kind: "ok", orderServices }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getComponents(): Promise<
    { kind: "ok"; components: ComponentSnapshotIn[] } | GeneralApiProblem
  > {
    try {

      const components: ComponentSnapshotIn[] = componentsMock as unknown as ComponentSnapshotIn[];

      console.log("🎸 components", components);

      return { kind: "ok", components }
    } catch {
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
