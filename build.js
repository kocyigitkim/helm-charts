const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

function convert_folder_to_zip(folder_path, zip_path) {
    var zip = new AdmZip();
    zip.addLocalFolder(folder_path);
    zip.writeZip(zip_path);
    
}

async function main() {
    var build_path = path.resolve(process.cwd(), 'build');
    var charts = fs.readdirSync(path.join(process.cwd(), "charts"), { withFileTypes: true }).filter(item => item.isDirectory()).map(item => item.name);
    if (!fs.existsSync(build_path)) {
        fs.mkdirSync(build_path, { recursive: true });
    }
    console.log(charts);
    for (var chartName of charts) {
        var chart_path = path.join(process.cwd(), "charts", chartName);
        var zip_path = path.join(build_path, chartName + '.zip');
        convert_folder_to_zip(chart_path, zip_path);
        console.log(zip_path);
    }
}
main();