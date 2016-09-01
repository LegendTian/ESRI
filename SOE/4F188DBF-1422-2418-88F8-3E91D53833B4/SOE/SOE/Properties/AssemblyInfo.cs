//-----------------------------------------------------------------------
// <copyright file="AssemblyInfo.cs" company="Studio AT s.r.l.">
//     Copyright (c) Studio AT s.r.l. All rights reserved.
// </copyright>
// <author>Nicogis</author>
//-----------------------------------------------------------------------

using System;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Runtime.InteropServices;
using ESRI.ArcGIS.SOESupport;

// General Information about an assembly is controlled through the following 
// set of attributes. Change these attribute values to modify the information
// associated with an assembly.
[assembly: AssemblyTitle("Studioat.ArcGis.Soe.Rest.DSUtility")]
[assembly: AssemblyDescription("")]
[assembly: AssemblyConfiguration("")]
[assembly: AssemblyCompany("")]
[assembly: AssemblyProduct("Studioat.ArcGis.Soe.Rest.DSUtility")]
[assembly: AssemblyCopyright("Copyright ©  2012")]
[assembly: AssemblyTrademark("")]
[assembly: AssemblyCulture("")]

// Setting ComVisible to false makes the types in this assembly not visible 
// to COM components.  If you need to access a type in this assembly from 
// COM, set the ComVisible attribute to true on that type.
[assembly: ComVisible(false)]

// The following GUID is for the ID of the typelib if this project is exposed to COM
[assembly: Guid("29462e92-e0d2-4815-a4a1-4a5900a20dc3")]

// Version information for an assembly consists of the following four values:
//
//      Major Version
//      Minor Version 
//      Build Number
//      Revision
//
// You can specify all the values or you can default the Build and Revision Numbers 
// by using the '*' as shown below:
// [assembly: AssemblyVersion("1.0.*")]
[assembly: AssemblyVersion("1.1.0.0")]
[assembly: AssemblyFileVersion("1.1.0.0")]
[assembly: CLSCompliant(false)]

[assembly: AddInPackage("DSUtility", "20eb58cd-a619-47ac-a6ce-1ca53ed94753",
    Author = "nicogis",
    Company = "Studio A&T s.r.l.",
    Description = "Dynamic Segmentation Utility",
    TargetProduct = "Server",
    TargetVersion = "10.2",
    Version = "1.1")]

[module: SuppressMessage("Microsoft.Design", "CA1020:AvoidNamespacesWithFewTypes", Scope = "namespace", Target = "Studioat.ArcGis.Soe.Rest", Justification = "-")]
[module: SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", Scope = "namespace", Target = "Studioat.ArcGis.Soe.Rest", MessageId = "Soe", Justification = "-")]
[module: SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", Scope = "member", Target = "Studioat.ArcGis.Soe.Rest.RouteLayerInfo.#ToJsonObject()", MessageId = "Json", Justification = "-")]
[module: SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", MessageId = "Soe", Justification = "-")]