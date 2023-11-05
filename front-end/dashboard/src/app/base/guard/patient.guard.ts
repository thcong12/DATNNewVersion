// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
// import { ViewModelService } from '@core/base/services/view-model.service';
// import { AlertSettingService } from '@services/alert-setting/alert-setting.service';
// import { PatientService } from '@services/patient/patient.service';
// import { PatientDetailInformation } from '@shared/services/api-services/models/response-model';
// import { lastValueFrom, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PatientGuard implements CanActivate {
//   constructor(
//     private vms: ViewModelService,
//     private patientService: PatientService,
//     private alertService: AlertSettingService
//   ) {}

//   async canActivate(route: ActivatedRouteSnapshot) {
//     await this.getPatientDetail(route);

//     return true;
//   }

//   /**
//    * Get the detail of patient
//    * @param patientId The given patientID
//    */
//   private async getPatientDetail(route: ActivatedRouteSnapshot): Promise<void> {
//     // Set screen name
//     this.vms.globalVariables.screenName = (route.data as any).screenName;
//     // Get patient information by patientID
//     const id = route.params['id'];
//     this.vms.globalVariables.patientId = id;
//     if (id) {
//       // Find the patientID in localStorage
//       const patientInformation = this.vms.globalVariables.patientInformation;

//       // Case: The patient information is stored and the patientId === the id in params
//       // No need call API again
//       if (patientInformation?.PatientID === id) {
//         // Get new alert
//         await Promise.all([
//           this.alertService.getAlertStatusData(patientInformation?.PatientUID!),
//           this.alertService.getAlertSetting(patientInformation?.PatientUID!)
//         ]);
//         return;
//       }

//       // Otherwise, call API with other id
//       // Find the patientUID by patientId
//       const res = await lastValueFrom(this.patientService.getPatientById(id));

//       const data = await Promise.all([
//         lastValueFrom(
//           this.patientService.getPatientInformation(res.PatientUID)
//         ),
//         of(this.alertService.getAlertStatusData(res.PatientUID)),
//         of(this.alertService.getAlertSetting(res.PatientUID))
//       ]);
//       // Case: Page is loading get patient information but user click back to list
//       this.vms.globalVariables.patientInformation = !(route.data as any).isList
//         ? { ...(data[0] as PatientDetailInformation), ...res }
//         : undefined;
//     } else {
//       this.vms.globalVariables.patientInformation = undefined;
//     }
//   }
// }
