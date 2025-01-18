/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from "../models/User";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UserInnerControllerService {
  /**
   * getById
   * @param userId user_id
   * @returns User OK
   * @throws ApiError
   */
  public static getByIdUsingGet(userId: number): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/user/inner/get/id",
      query: {
        user_id: userId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listByIds
   * @param idList idList
   * @returns User OK
   * @throws ApiError
   */
  public static listByIdsUsingGet(
    idList: number
  ): CancelablePromise<Array<User>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/user/inner/get/ids",
      query: {
        idList: idList,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * savePersonalizedFeedback
   * @param personalizedFeedback personalizedFeedback
   * @param questionSubmitId questionSubmitId
   * @returns boolean OK
   * @returns any Created
   * @throws ApiError
   */
  public static savePersonalizedFeedbackUsingPost(
    personalizedFeedback: string,
    questionSubmitId: number
  ): CancelablePromise<boolean | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/inner/savePersonalizedFeedback",
      query: {
        personalizedFeedback: personalizedFeedback,
        questionSubmitId: questionSubmitId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * saveTeachingGuidance
   * @param questionSubmitId questionSubmitId
   * @param teachingGuidance teachingGuidance
   * @returns boolean OK
   * @returns any Created
   * @throws ApiError
   */
  public static saveTeachingGuidanceUsingPost(
    questionSubmitId: number,
    teachingGuidance: string
  ): CancelablePromise<boolean | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/inner/saveTeachingGuidance",
      query: {
        questionSubmitId: questionSubmitId,
        teachingGuidance: teachingGuidance,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateFeedbackAndGuidance
   * @param personalizedFeedback personalizedFeedback
   * @param questionSubmitId questionSubmitId
   * @param teachingGuidance teachingGuidance
   * @returns boolean OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateFeedbackAndGuidanceUsingPost(
    personalizedFeedback: string,
    questionSubmitId: number,
    teachingGuidance: string
  ): CancelablePromise<boolean | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/inner/updateFeedbackAndGuidance",
      query: {
        personalizedFeedback: personalizedFeedback,
        questionSubmitId: questionSubmitId,
        teachingGuidance: teachingGuidance,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
