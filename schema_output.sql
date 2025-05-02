DROP TABLE IF EXISTS DimPCP_PBI CASCADE;

CREATE TABLE DimPCP_PBI (
ID INT,
AppPCPID INT,
PCPName NVARCHAR,
NPI NVARCHAR,
  PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS DimOfficeLocation_PBI CASCADE;

CREATE TABLE DimOfficeLocation_PBI (
ID INT,
AppOfficeID INT,
OfficeName NVARCHAR,
TIN NVARCHAR,
RegionName NVARCHAR,
  PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS DimProviderGroup_PBI CASCADE;

CREATE TABLE DimProviderGroup_PBI (
ID INT,
ProviderGroupName NVARCHAR,
  PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS DimProviderSubGroup_PBI CASCADE;

CREATE TABLE DimProviderSubGroup_PBI (
ID INT,
ProviderSubGroupName NVARCHAR,
  PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS DimInsurance_PBI CASCADE;

CREATE TABLE DimInsurance_PBI (
ID INT,
InsuranceName NVARCHAR,
  PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS DimInsurancePlan_PBI CASCADE;

CREATE TABLE DimInsurancePlan_PBI (
ID INT,
PlanCode NVARCHAR,
PlanName NVARCHAR,
InsuranceClass NVARCHAR,
IsSNPPlan BIT,
SNPIndicator NVARCHAR,
  PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS DimInsuranceOfficePCPGroup_PBI CASCADE;

CREATE TABLE DimInsuranceOfficePCPGroup_PBI (
PCPid INT,
OfficeLocationID INT,
ProviderGroupID INT,
ProviderSubGroupID INT,
  FOREIGN KEY (PCPid) REFERENCES DimPCP_PBI(ID),
  FOREIGN KEY (OfficeLocationID) REFERENCES DimOfficeLocation_PBI(ID),
  FOREIGN KEY (ProviderGroupID) REFERENCES DimProviderGroup_PBI(ID),
  FOREIGN KEY (ProviderSubGroupID) REFERENCES DimProviderSubGroup_PBI(ID)
);

DROP TABLE IF EXISTS DimMember_PBI CASCADE;

CREATE TABLE DimMember_PBI (
ID INT,
MemberName NVARCHAR,
DOB DATE,
Gender NVARCHAR,
Address1 NVARCHAR,
Address2 NVARCHAR,
City NVARCHAR,
ZipCode NVARCHAR,
Country NVARCHAR,
County NVARCHAR,
State NVARCHAR,
AppMemberID INT,
LastRiskScoreC DECIMAL,
LastRiskScoreD DECIMAL,
HasChronicDisease BIT,
DeceasedDate DATE,
  PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS FactMemberPMPM_PBI CASCADE;

CREATE TABLE FactMemberPMPM_PBI (
ID INT,
CustomerID SMALLINT,
InsuranceID INT,
InsurancePlanID INT,
LOBName VARCHAR,
InsuranceOfficePCPGroupID INT,
MemberID INT,
SubscriberCode VARCHAR,
CalenderDateID INT,
ActiVityDate DATE,
SourceLOB INT,
MemberCount INT,
RiskScoreC VARCHAR,
RiskScoreD TINYINT,
IsAged BIT,
IsDisabled BIT,
IsESRD BIT,
IsHospice BIT,
IsDualEligible BIT,
DualCode BIT,
EnrollmentDate DATE,
MedicareNumber VARCHAR,
RiscscoreCExists TINYINT,
RiscscoreDExists TINYINT,
SourceInsGrouperCode VARCHAR,
RiskType VARCHAR,
GrouperName VARCHAR,
IsDataShareExcluded BIT,
ProjectedRiskScorePartC NUMERIC,
PotentialRiskScorePartC NUMERIC,
ProjectedRiskScorePartD NUMERIC,
PotentialRiskScorePartD NUMERIC,
AgeGroupCode VARCHAR,
  PRIMARY KEY (ID),
  FOREIGN KEY (InsuranceID) REFERENCES DimInsurance_PBI(ID),
  FOREIGN KEY (InsurancePlanID) REFERENCES DimInsurancePlan_PBI(ID),
  FOREIGN KEY (InsuranceOfficePCPGroupID) REFERENCES DimInsuranceOfficePCPGroup_PBI(ID),
  FOREIGN KEY (MemberID) REFERENCES DimMember_PBI(ID)
);

DROP TABLE IF EXISTS FactMemberSummaryPMPM_PBI CASCADE;

CREATE TABLE FactMemberSummaryPMPM_PBI (
FactMemberPMPMID INT,
AmtActualInstClaim MONEY,
AmtActualInstClaimCovid MONEY,
AmtActualProfClaim MONEY,
AmtActualProfClaimCovid MONEY,
AmtActualRxClaim MONEY,
AmtActualRxClaimCovid MONEY,
AmtTotalExpenses MONEY,
AmtTotalExpensesCovid MONEY,
AmtAdjustmentPartA MONEY,
AmtAdjustmentPartB MONEY,
AmtAdjustmentPartC MONEY,
AmtAdjustmentPartD MONEY,
AmtAdjustmentTotal MONEY,
AmtBalance MONEY,
AmtCMSPremiumA MONEY,
AmtCMSPremiumB MONEY,
AmtCMSPremiumC MONEY,
AmtCMSPremiumD MONEY,
AmtCMSTotalPremium MONEY,
AmtDisbursement MONEY,
AmtIBNR MONEY,
AmtPartAClaim MONEY,
AmtPartBClaim MONEY,
AmtPartCClaim MONEY,
AmtPartDClaim MONEY,
AmtTotalClaim MONEY,
AmtPOPPartA MONEY,
AmtPOPPartB MONEY,
AmtPOPPartC MONEY,
AmtPOPPartD MONEY,
AmtPOPTotal MONEY,
AmtPCPCap MONEY,
AmtReInsurance MONEY,
AmtSpecialtyCap MONEY,
AmtStopLossPartA MONEY,
AmtStopLossPartB MONEY,
AmtStopLossPartC MONEY,
AmtStopLossPartD MONEY,
AmtTotalStopLoss MONEY,
  PRIMARY KEY (FactMemberPMPMID),
  FOREIGN KEY (FactMemberPMPMID) REFERENCES FactMemberPMPM_PBI(ID)
);

DROP TABLE IF EXISTS FactClaimDetails_PBI CASCADE;

CREATE TABLE FactClaimDetails_PBI (
ClaimId INT,
FactMemberPMPMID INT,
ClaimNumber NVARCHAR,
LineNumber BIGINT,
ClaimType VARCHAR,
DOSStart DATE,
DOSEnd DATE,
ClaimStatus VARCHAR,
DrgCode VARCHAR,
ServiceProviderID INT,
ServiceProviderParStatus VARCHAR,
IsInNetwrok TINYINT,
NDC VARCHAR,
DrugDesc VARCHAR,
DrugPartTypeFlag VARCHAR,
DrugGenericIndicator VARCHAR,
RevenueCode1 VARCHAR,
Quantity DECIMAL,
AmtBilled MONEY,
AmtAllowed MONEY,
AmtPaid MONEY,
ClaimCategory VARCHAR,
ClmTyp_ClmCnt TINYINT,
ClmTypSpec_ClmCnt TINYINT,
ClmTypSpecProvider_ClmCnt TINYINT,
ClmTypClmCategory_ClmCnt TINYINT,
ClmTypSpecCPTProv_ClmCnt TINYINT,
ACORxAmtPaid MONEY,
FacilityType VARCHAR,
ClmTypInNetworkVisit_ClmCnt TINYINT,
IsCovidClaim BIT,
IsZeroDollarclaim BIT,
ServiceProviderSpecialtyID INT,
POSCode VARCHAR,
POSDesc VARCHAR,
CPTCode VARCHAR,
CPTDescription VARCHAR,
ICDClinicalTypeCodeID SMALLINT,
PrimaryDiagnosisCode VARCHAR,
PrimaryDiagnosisDesc VARCHAR,
DimVendorID INT,
TherapeuticClass VARCHAR,
VendorCodeType VARCHAR,
BillTypeCode VARCHAR,
ServiceProviderCode VARCHAR,
DRGWeights DECIMAL,
ServiceProviderSourceSpecialty VARCHAR,
BillingProviderCode VARCHAR,
CheckDate DATE,
SpecialityName VARCHAR,
ServiceProviderName VARCHAR,
ServiceProviderCity VARCHAR,
BillingProviderName VARCHAR,
  PRIMARY KEY (ClaimId),
  FOREIGN KEY (FactMemberPMPMID) REFERENCES FactMemberPMPM_PBI(ID)
);
