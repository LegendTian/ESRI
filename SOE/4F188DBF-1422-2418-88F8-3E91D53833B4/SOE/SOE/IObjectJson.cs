﻿//-----------------------------------------------------------------------
// <copyright file="IObjectJson.cs" company="Studio AT s.r.l.">
//     Copyright (c) Studio AT s.r.l. All rights reserved.
// </copyright>
// <author>Nicogis</author>
namespace Studioat.ArcGis.Soe.Rest
{
    using ESRI.ArcGIS.SOESupport;
    
    /// <summary>
    /// interface for conversion in JsonObjects
    /// </summary>
    internal interface IObjectJson
    {
        /// <summary>
        /// conversion to a JsonObject
        /// </summary>
        /// <returns>return a JsonObject</returns>
        JsonObject ToJsonObject();
    }
}