<?php

namespace App\Http\Repositories;
use Illuminate\Support\Facades\DB;

class Address
{
    public function getAddressInfo($region, $province, $municipality, $barangay){
        $region = DB::table('region')
            ->select("regionDescription")
            ->where("regionID", $region)
            ->get();
        
        $province = DB::table('province')
            ->select("provinceName")   
            ->where("provinceID", $province)
            ->get();
        
        $municipality = DB::table('municipality')
            ->select("municipalityName")
            ->where("municipalityID", $municipality)
            ->get();

        $barangay = DB::table('barangay')
            ->select("barangayName")
            ->where("barangayID", $barangay)
            ->get();
        
        return [
            'region' => $region,
            'province' => $province,
            'municipality' => $municipality,
            'barangay' => $barangay
        ];
    }
}
