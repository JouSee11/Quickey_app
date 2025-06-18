## Jak vytvorit .uf2 soubor z celeho kodu
- 1) nahrat na device circuitpython a vsechny kody soubory
- 2) stahnout si picotool (idealne to pridat do /bin slozky - nebo neco takovyho)
- 3) pripojit device tak ze znacnu boot tlacitko aby byl v BOOTSEL modu
- 4) zavolat commant v jake koliv slozce - `sudo picotool save --all my_code.uf2`
v dane slozce bude vyvoreny uf2 soubor, ve kterem bude circuitpython i nas kod
#### Prejmenovani zarizeni
- v boot.py je specifikovany nejaky usb identificator, ten funguje ze na linuxu to actually ukazuje to dane jmeno v webserial api pri vyberu, na win ale ne
- pro zobrazeni na windowsu jsem ve slozce ..../boards/raspberry/waveshare_rp2040_zero v nejakem souboru .mk zmenil jmena a pak to buildnul `make BOARD=waveshare_rp2040_zero`, na windows to pak ukazovalo to jmeno ale bylo to zaroven napr. CircuitPython MyName -> nevim jak to udelat aby tam to circuitpython nebylo :( 
