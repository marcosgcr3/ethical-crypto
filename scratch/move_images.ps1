$source = "C:\Users\marco\.gemini\antigravity\brain\e7b99565-bf1e-49dc-b6e8-16c849e0ceda"
$dest = "c:\Users\marco\biohacking\public\images\articles"

if (!(Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest
}

$mapping = @{
    "10_3_2_1_0_sleep_rule_breakdown_png_*.png" = "10-3-2-1-0-sleep-rule-breakdown.png"
    "carnivore_diet_microbiome_metagenomics_2026_png_*.png" = "carnivore-diet-microbiome-metagenomics-2026.png"
    "deuterium_depleted_water_longevity_myth_science_png_*.png" = "deuterium-depleted-water-longevity-myth-science.png"
    "dog_aging_project_human_longevity_rapamycin_png_*.png" = "dog-aging-project-human-longevity-rapamycin.png"
    "exogenous_ketones_cognitive_endurance_performance_png_*.png" = "exogenous-ketones-cognitive-endurance-performance.png"
    "hbot_protocols_longevity_telomere_lengthening_png_*.png" = "hbot-protocols-longevity-telomere-lengthening.png"
    "high_altitude_sleep_biohacking_hypoxia_png_*.png" = "high-altitude-sleep-biohacking-hypoxia.png"
    "magnesium_threonate_vs_glycinate_brain_health_png_*.png" = "magnesium-threonate-vs-glycinate-brain-health.png"
    "mitochondrial_transfer_cellular_energy_future_png_*.png" = "mitochondrial-transfer-cellular-energy-future.png"
    "non_invasive_hydration_sensors_electrolyte_tracking_png_*.png" = "non-invasive-hydration-sensors-electrolyte-tracking.png"
    "plasma_exchange_eper_biological_age_reset_png_*.png" = "plasma-exchange-eper-biological-age-reset.png"
    "post_prandial_walking_vs_metformin_glucose_png_*.png" = "post-prandial-walking-vs-metformin-glucose.png"
    "senomorphics_vs_senolytics_next_gen_longevity_png_*.png" = "senomorphics-vs-senolytics-next-gen-longevity.png"
    "sleep_neuroplasticity_skill_acquisition_png_*.png" = "sleep-neuroplasticity-skill-acquisition.png"
    "smart_rings_vs_watches_sleep_staging_accuracy_png_*.png" = "smart-rings-vs-watches-sleep-staging-accuracy.png"
    "sulforaphane_sprouting_guide_biohacking_png_*.png" = "sulforaphane-sprouting-guide-biohacking.png"
    "weighted_blankets_hrv_parasympathetic_tone_png_*.png" = "weighted-blankets-hrv-parasympathetic-tone.png"
}

foreach ($pattern in $mapping.Keys) {
    $file = Get-ChildItem -Path $source -Filter $pattern | Select-Object -First 1
    if ($file) {
        Copy-Item -Path $file.FullName -Destination (Join-Path $dest $mapping[$pattern]) -Force
        Write-Host "Copiado $($file.Name) a $($mapping[$pattern])"
    } else {
        Write-Warning "No se encontró archivo para el patrón $pattern"
    }
}
