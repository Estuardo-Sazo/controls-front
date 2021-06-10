let idMenu = document.getElementById('Menu');
let nav = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <a><img  class="im"src="../iconos/suministro.png" alt="" style="width: 50px;"></a>
    <a class="navbar-brand" href="../index/">CONTROL APP</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <a class="nav-link active" href="../index/">Inicio <span class="sr-only">(current)</span></a>
            <a class="nav-link" href="../groups/">Grupos de gastos</a>
            <a class="nav-link" href="../sub-groups/">Sub grupos de gastos</a>
            <a class="nav-link" href="../expenses/">Gastos</a>
            <a class="nav-link" href="../income/">Ingresos</a>
            <a class="nav-link" href="../estimates/">Presupuesto</a>

        </div>
    </div>
    </div>
    </nav>

`;
idMenu.innerHTML = nav;